'use strict';
import React,{Component} from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import {request,openurl,reg} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            sendCode: null,
            sendTime: 30,
            phone: props.location.state&&props.location.state.phone || null
        }
    }
    handleSendMessage = () => {
        const {phone} = this.state;
        if(!phone||!reg.phone.test(phone)) {
            Toast.fail('请输入正确的手机号', 1);
            return false;
        }
        this.handleTime();
        request.getRegistVerificationCode({
            data: {mobile:phone},
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
        const {sendCode, code} = this.state;
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
        openurl('$registerPassword', {...this.props.location.state,code});
    }
    render() {
        const {sendTime,phone} = this.state;
        return (
            <div className='message'>
                <List renderHeader={() => `请输入${phone}收到的验证码`}>
                    <div className="codeBox">
                        <InputItem
                            type="number"
                            maxLength="4"
                            className="codeInput"
                            placeholder="请输入验证码"
                            onChange={code => this.setState({code})}
                            moneyKeyboardAlign="left"
                        />
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