'use strict';
import React,{Component} from 'react';
import { List, InputItem, Button, Toast, NavBar, Icon } from 'antd-mobile';
import {request,reg,openurl} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitationCode: null,
            phone: null
        }
    }
    handleSubmit = () => {
        const {phone,invitationCode} = this.state;
        if(!invitationCode) {
            Toast.fail('请输入邀请码', 1);
            return false;
        }
        if(!phone) {
            Toast.fail('请输入手机号', 1);
            return false;
        }
        if(!reg.phone.test(phone)) {
            Toast.fail('请输入正确的手机号', 1);
            return false;
        }
        request.getUseExt({
            data:{invitationCode},
            ok:(res) => {
                if(res.data) openurl('$registerMessage', {phone,invitationCode});
            }
        });
    }
    render() {
        return (
            <div className='register'>
                <List>
                    <InputItem
                        type="text"
                        placeholder="请输入邀请码"
                        clear
                        onChange={invitationCode => this.setState({invitationCode})}
                        moneyKeyboardAlign="left"
                    >邀请码:</InputItem>
                    <InputItem
                        type="number"
                        maxLength="11"
                        placeholder="请输入您的手机号作为登录名"
                        clear
                        onChange={phone => this.setState({phone})}
                        moneyKeyboardAlign="left"
                    >手机号:</InputItem>
                </List>
                <div className='button'>
                    <Button
                        type="primary"
                        style={{height: '40px',lineHeight: '40px'}}
                        onClick={this.handleSubmit}
                    >下一步</Button>
                </div>
            </div>
        );
    }
}