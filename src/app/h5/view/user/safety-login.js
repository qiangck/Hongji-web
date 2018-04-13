'use strict';
import React,{Component} from 'react';
import { List, Button, Toast  } from 'antd-mobile';
import { InputLabel } from 'comp';
import { request, reg } from 'util';
import { login } from 'method';
import './index.less';
const Item = List.Item;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            passwordConfirm: null
        }
    }
    componentWillMount () {}
    handleSubmit = () => {
        const {password, passwordConfirm} = this.state;
        if((!password || !passwordConfirm)
            || password&&!reg.password.test(password)
            || passwordConfirm&&!reg.password.test(passwordConfirm)) {
            Toast.fail('请填写新的密码并确认', 1);
            return false;
        }
        if(password != passwordConfirm) {
            Toast.fail('两次密码输入一致才可继续提交', 1);
            return false;
        }
        request.updateUser({
            data: {password},
            ok:(res) => {
                Toast.success('修改成功', 1, () => login.logout());
            }
        })
    }
    render() {
        return (
            <div className='user user_safety_login'>
            	<InputLabel
                    type="password"
                    onChange={val => this.setState({password:val})}
                >新密码：</InputLabel>
                <InputLabel
                    type="password"
                    onChange={val => this.setState({passwordConfirm:val})}
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