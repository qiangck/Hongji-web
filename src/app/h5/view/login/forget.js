'use strict';
import React,{Component} from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import {request,reg,openurl} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankNum: null,
            userName: null
        }
    }
    handleSubmit = () => {
        const {userName,bankNum} = this.state;
        if(!bankNum) {
            Toast.fail('请输入银行卡号', 1);
            return false;
        }
        if(!userName) {
            Toast.fail('请输入账号', 1);
            return false;
        }
        if(!reg.phone.test(userName)) {
            Toast.fail('请输入正确的账号', 1);
            return false;
        }
        request.valiadUserByBank({
            data:{bankNum,userName},
            ok:(res) => {
                if(res.data) openurl('$forgetMessage',{...this.state});
            }
        });
    }
    render() {
        return (
            <div className='register'>
                <List>
                    <InputItem
                        type="number"
                        maxLength="11"
                        placeholder="请输入手机号"
                        clear
                        onChange={userName => this.setState({userName})}
                        moneyKeyboardAlign="left"
                    >账号:</InputItem>
                    <InputItem
                        type="number"
                        placeholder="请输入您的银行卡号"
                        clear
                        onChange={bankNum => this.setState({bankNum})}
                        moneyKeyboardAlign="left"
                    >银行卡:</InputItem>
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