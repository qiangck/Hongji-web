'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import { List, InputItem, Button, Checkbox, Toast } from 'antd-mobile';
import {request,reg} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputType: 'password',
            password: null
        }
    }
    handleSubmit = () => {
        const {password} = this.state;
        const {invitationCode,phone,code} = this.props.location.state;
        if(!reg.password.test(password)) {
            Toast.fail('密码为6-10位纯数字或字母', 1);
            return false;
        }
        request.userSave({
            data: {
                password,
                mobile: phone,
                invitationCode,
                verificationCode:code
            },
            ok:(res) => {
                Toast.success('注册成功', 1, () => hashHistory.replace('/login'));
            }
        });
    }
    render() {
        const {phone} = this.props;
        const {inputType} = this.state;
        return (
            <div className='password'>
                <List renderHeader={() => '请设置登录密码'}>
                    <InputItem
                        type={inputType}
                        maxLength={10}
                        onChange={password => this.setState({password})}
                        placeholder="请输入6~10位字符"
                    ></InputItem>
                </List>
                <div className="showPassword"><Checkbox onChange={(e) => {
                    this.setState({inputType: e.target.checked?'text':'password'})
                }}>密码可见</Checkbox></div>
                <p className="infoPassword">密码由6~10位字母、数字或符号组成，不能是6位以下纯数字、字母，字母区分大小写。</p>
                <div className='button'>
                    <Button
                        type="primary"
                        style={{height: '40px',lineHeight: '40px'}}
                        onClick={this.handleSubmit}
                    >完成</Button>
                </div>
            </div>
        );
    }
}