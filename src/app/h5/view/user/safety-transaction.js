'use strict';
import React,{Component} from 'react';
import { List, Button, Toast  } from 'antd-mobile';
import { InputLabel } from 'comp';
import { request, openurl } from 'util';
import './index.less';
const Item = List.Item;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionPassword: null,
            transactionPasswordConfirm: null
        }
    }
    componentWillMount () {}
    handleSubmit = () => {
        const {transactionPassword, transactionPasswordConfirm} = this.state;
        if(!transactionPassword || !transactionPasswordConfirm) {
            Toast.fail('请填写新的密码并确认', 1);
            return false;
        }
        if(transactionPassword != transactionPasswordConfirm) {
            Toast.fail('两次密码输入一致才可继续提交', 1);
            return false;
        }
        request.updateUser({
            data: {transactionPassword},
            ok:(res) => {
                Toast.success('修改成功', 1, () => openurl('back'));
            }
        })
    }
    render() {
        return (
            <div className='user user_safety_login'>
                <InputLabel
                    type="password"
                    onChange={val => this.setState({transactionPassword:val})}
                >交易密码：</InputLabel>
                <InputLabel
                    type="password"
                    onChange={val => this.setState({transactionPasswordConfirm:val})}
                >确认密码：</InputLabel>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >确认修改</Button>
            </div>
        );
    }
}