'use strict';
import React,{Component} from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import {request,openurl, reg} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            sendCode: null,
            sendTime: 30,
            userName: null,
            password: null,
            confirmPass: null,
        }
    }
    handleSendMessage = () => {
        const {userName} = this.state;
        if(!userName||!reg.phone.test(userName)) {
            Toast.fail('请输入正确的手机号', 1);
            return false;
        }
        this.handleTime();
        request.getRegistVerificationCode({
            data: {mobile:userName},
            ok:(res) => {
                this.setState({sendCode: res.data.verificationCode});
            }
        });
    }
    handleTime = () => {
        const {sendTime} = this.state;
        let time = setTimeout(() => {
            if(sendTime > 1) {
                this.setState({sendTime: sendTime - 1});
                this.handleTime();
            } else {
                this.setState({sendTime: 30});
            }
            clearTimeout(time);
        }, 1000);
    }
    handleSubmit = () => {
        const {password, confirmPass, code, sendCode, userName} = this.state;
        if(!userName||!reg.phone.test(userName)) {
            Toast.fail('请输入正确的手机号', 1);
            return false;
        }
        if(!code) {
            Toast.fail('请输入验证码', 1);
            return false;
        }
        if(!sendCode) {
            Toast.fail('请发送验证码', 1);
            return false;
        }
        if(code != sendCode) {
            Toast.fail('请输入正确的验证码', 1);
            return false;
        }
        if(!reg.password.test(password)) {
            Toast.fail('密码为6-10位纯数字或字母', 1);
            return false;
        }
        if(password != confirmPass) {
            Toast.fail('两次密码不一致', 1);
            return false;
        }
        request.updateUser({
            data: {
                userName,
                password,
                verificationCode:code,
                mobile:userName
            },
            noUserid: true,
            ok:(res) => {
                Toast.success('密码重置成功', 1, () => openurl('$'));
            }
        })
    }
    render() {
        const {sendTime} = this.state;
        return (
            <div className='message'>
                <List>
                    <InputItem
                        type="number"
                        maxLength="11"
                        placeholder="请输入手机号"
                        clear
                        onChange={userName => this.setState({userName})}
                        moneyKeyboardAlign="left"
                    >账号</InputItem>
                    <div className="codeBox" style={{borderBottom: '1PX solid #ddd'}}>
                        <InputItem
                            type="number"
                            maxLength="4"
                            className="codeInput"
                            placeholder="请输入验证码"
                            onChange={code => this.setState({code})}
                            moneyKeyboardAlign="left"
                        >验证码</InputItem>
                        {sendTime<30&&<Button
                            type="primary"
                            className="codeButton"
                        >{sendTime}S后重新发送</Button>}
                        {sendTime>=30&&<Button
                            type="primary"
                            className="codeButton"
                            onClick={this.handleSendMessage}
                        >验证码</Button>}
                    </div>
                    <InputItem
                        type="Password"
                        maxLength="11"
                        placeholder="请设置登录密码"
                        clear
                        onChange={password => this.setState({password})}
                        moneyKeyboardAlign="left"
                    >设置新密码</InputItem>
                    <InputItem
                        type="Password"
                        maxLength="11"
                        placeholder="确定登录密码"
                        clear
                        onChange={confirmPass => this.setState({confirmPass})}
                        moneyKeyboardAlign="left"
                    >确定新密码</InputItem>
                </List>
                <div className='button'>
                    <Button
                        type="primary"
                        style={{height: '40px',lineHeight: '40px'}}
                        onClick={this.handleSubmit}
                    >确定</Button>
                </div>
            </div>
        );
    }
}