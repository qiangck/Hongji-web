'use strict';
import React,{Component} from 'react';
import { Button, Toast  } from 'antd-mobile';
import { InputLabel } from 'comp';
import { request, openurl, getUserInfo, setUserInfo } from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketMax: null,
            ticketNum: null,
            userAccount: null,
            transactionPassword: null
        }
    }
    componentWillMount () {}
    componentDidMount () {
        setUserInfo(() => {
            getUserInfo((userinfo) => this.setState({ticketMax:userinfo.ticket||0}));
        });
    }
    handleSubmit = () => {
        const {ticketNum, userAccount, transactionPassword} = this.state;
        if(ticketNum==null) {
            Toast.fail('请填写转出数量', 1);
            return false;
        }
        if(ticketNum<=0) {
            Toast.fail('转出数量需大于0', 1);
            return false;
        }
        if(!userAccount) {
            Toast.fail('请填写目标账号', 1);
            return false;
        }
        if(!transactionPassword) {
            Toast.fail('请填写交易密码', 1);
            return false;
        }
        request.transaction({
            data:{ticketNum,userAccount,transactionPassword},
            ok:(res) => {
                Toast.info('兑换成功', 1, ()=>openurl('back'));
            },
            error: ()=> {
                Toast.offline('网络异常', 2,() => window.location.reload(true));
            }
        });
    }
    render() {
        const {ticketMax, ticketNum} = this.state;
        return (
            <div className='service-voucher'>
                <InputLabel
                    value={ticketNum}
                    type="number"
                    placeholder="请输入转出数量"
                    onChange={value => {
                        this.setState({ticketNum: value > ticketMax?ticketMax:value?parseInt(value):null})
                    }}
                >数量：</InputLabel>
                <InputLabel
                    type="text"
                    maxLength={40}
                    placeholder="请输入对方微股东账号"
                    onChange={val => this.setState({userAccount:val})}
                >转出：</InputLabel>
                <InputLabel
                    type="password"
                    maxLength={20}
                    placeholder="请输入您的交易密码"
                    onChange={val => this.setState({transactionPassword:val})}
                >交易密码：</InputLabel>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >确定</Button>
            </div>
        );
    }
}