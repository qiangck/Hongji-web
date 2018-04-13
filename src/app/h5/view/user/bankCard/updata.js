'use strict';
import React,{Component} from 'react';
import _ from 'lodash';
import {request,openurl} from 'util';
import { Button, Toast } from 'antd-mobile';
import { InputLabel } from 'comp'
import '../index.less';
export default class Updata extends Component {
    constructor(props) {
        super(props);
        this.state = this.propsDefault(props)
    }
    propsDefault(props) {
        const {item} = props.location.state || {};
        if(item) {
            return {
                bankName: item.bankName || null,
                bankNum: item.bankNum || null
            };
        } else {
            return {
                bankName: null,
                bankNum: null
            }
        }
    }
    handleSubimt = () => {
        const {bankName, bankNum} = this.state;
        const {item,isDefault} = this.props.location.state || {};
        if(!bankName) {
            Toast.info('请输入开户行', 1);
            return false;
        }
        if(!bankNum) {
            Toast.info('请输入银行卡号', 1);
            return false;
        }
        let param = {bankName, bankNum};
        if(isDefault!=null) param = _.assign(param,{isDefault});
        if(item!=null) param = _.assign(param,{id:item.id});
        request.updateUserBank({
            data: param,
            ok: (res) => {
                Toast.success(item?'修改成功':'添加成功', 1, () => openurl('back'));
            }
        });
    }
    render() {
        const {bankName,bankNum} = this.state;
        return (
            <div>
                <InputLabel
                    value={bankName}
                    type="text"
                    maxLength={20}
                    placeholder="请输入开户行"
                    onChange={val => this.setState({bankName:val})}
                >开户行：</InputLabel>
                <InputLabel
                    value={bankNum}
                    type="number"
                    maxLength={20}
                    placeholder="请输入银行卡号"
                    onChange={val => this.setState({bankNum:val})}
                >银行卡号：</InputLabel>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubimt}
                >确认</Button>
            </div>
        );
    }
}