'use strict';
import React,{Component} from 'react';
import {hashHistory} from 'react-router';
import _ from 'lodash';
import { Button, Toast } from 'antd-mobile';
import {request,reg,openurl} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            _width: document.body.clientWidth,
            _height: document.body.clientHeight
        }
    }
    componentDidMount () {}
    handleChange = (type, event) => {
        let obj = {};
        obj[type] = event.target.value;
        this.setState(obj);
    }
    handleSubmit = () => {
        const {username,password} = this.state;
        if(!username) {
            Toast.fail('请填写用户名', 1);
            return false;
        }
        if(!reg.phone.test(username)) {
            Toast.fail('请填写正确的用户名', 1);
            return false;
        }
        if(!password) {
            Toast.fail('请填写密码', 1);
            return false;
        }
        if(!reg.password.test(password)) {
            Toast.fail('密码为6-10位纯数字或字母', 1);
            return false;
        }
        request.login({
            data: {username,password},
            httpCode: [200],
            ok: (res) => {
                if(res.data) {
                    localStorage.setItem('userInfo',JSON.stringify(res.data));
                    hashHistory.replace('/');
                }
            }
        })
    }
    render() {
        const {_width,_height} = this.state;
        return (
            <div className='login'>
                <img
                    className="loginBg"
                    src="./resource/images/img-bgxxxhdpi.png"
                    style={{width:_width,height:_height}}
                />
                <div className="loginMain" style={{width:_width,height:_height}}>
                    <div className='info'>
                        <img src="./resource/images/img-logoxxxhdpi.png"/>
                        <p>泓德百年 济世安康</p>
                    </div>
                    <div className='content'>
                        <div><input
                            type="text"
                            pattern="[0-9]*"
                            placeholder="用户名"
                            autocomplete="off"
                            onChange={this.handleChange.bind(this,'username')}
                        /></div>
                        <div><input
                            type="password"
                            pattern="[0-9]*"
                            placeholder="密码"
                            autocomplete="off"
                            onChange={this.handleChange.bind(this,'password')}
                        /></div>
                    </div>
                    <div className='login_button'>
                        <Button
                            type="primary"
                            style={{height: '40px',lineHeight: '40px'}}
                            onClick={this.handleSubmit}
                        >登录</Button>
                        <div className='button_url'>
                            <a className='register' onClick={() => openurl('register')}>立即注册</a>
                            <a className='forget' onClick={() => openurl('forget')}>忘记密码</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}