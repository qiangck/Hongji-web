'use strict';
import React,{Component} from 'react';
import {request, openurl} from 'util';
import _ from 'lodash';
import { Modal, List, InputItem, TextareaItem, Switch,Button, Toast } from 'antd-mobile';
import { ManageItem } from 'comp'
import '../index.less';
export default class Updata extends Component {
    constructor(props) {
        super(props);
        this.state = this.propsDefault()
    }
    propsDefault() {
        const {param} = this.props.location.state || {};
        if(param) {
            return {
                name:param.name,
                phone:param.mobile,
                address:param.userAddress,
                isDefault: !!param.isDefault
            };
        } else {
            return {
                name:'',
                phone:'',
                address:'',
                isDefault: false
            }
        }
    }
    handleChange = (key, value) => {
        this.state[key] = value;
        this.forceUpdate();
    }
    handleSubimt = () => {
        const {name,address,isDefault} = this.state;
        const {param,list} = this.props.location.state || {};
        let nameReg = /^[\u4E00-\u9FA5A-Za-z]+$/;
        let phoneReg = /^1[34578]\d{9}$/;
        let phone = this.state.phone.replace(/\s/g, "");
        if(!name) {
            Toast.info('请输入收货人姓名', 1);
            return false;
        }
        if(!phone) {
            Toast.info('请输入手机号', 1);
            return false;
        }
        if(!phoneReg.test(phone)) {
            Toast.info('请输入正确的手机号', 1);
            return false;
        }
        if(!address) {
            Toast.info('请输入收货地址', 1);
            return false;
        }
        if(!nameReg.test(name)) {
            Toast.info('收货人姓名只能输入中文和字母', 1);
            return false;
        }
        let params = {
            userAddress: address,
            isDefault: 1,
            mobile: phone,
            name: name
        }
        // 如果是编辑状态可以改变默认地址
        param&&_.assign(params, {id:param.id,isDefault:isDefault?1:0});
        request.userAddressSave({
            data: params,
            ok: (res) => {
                Toast.success(param?'编辑成功':'添加成功', 1, ()=>openurl('back'));
            }
        });
    }
    render() {
        const {name,phone,address,isDefault} = this.state;
        const {param} = this.props.location.state || {};
        return (
            <div className='cartAddress'>
                <List>
                    <InputItem
                        value={name}
                        onChange={this.handleChange.bind(this,'name')}
                        maxLength={10}
                        placeholder="请输入收货人姓名"
                    >收货人</InputItem>
                    <InputItem
                        onChange={this.handleChange.bind(this,'phone')}
                        type="number"
                        maxLength={11}
                        value={phone}
                        placeholder="请输入手机号"
                    >手机号</InputItem>
                    <TextareaItem
                        rows={3}
                        value={address}
                        maxLength={50}
                        placeholder="请填写详细地址"
                        onChange={this.handleChange.bind(this,'address')}
                    />
                    {param&&param.isDefault != 1&&<List.Item
                        extra={<Switch
                            onChange={this.handleChange.bind(this,'isDefault')}
                            checked={isDefault}
                            color="red"
                        />}
                    >设为默认</List.Item>}
                    <List.Item>
                        <Button
                            style={{background: '#ff4040',color: '#fff'}}
                            onClick={this.handleSubimt}
                        >{param?'保存':'保存并使用'}</Button>
                    </List.Item>
                </List>
            </div>
        );
    }
}