'use strict';
import React,{Component} from 'react';
import { List, Button, Toast  } from 'antd-mobile';
import { InputLabel, SelectLabel } from 'comp';
import { request, openurl, setUserInfo, getUserInfo } from 'util';
import _ from 'lodash';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backCardList: null,
            backCardActive: null,
            dongObj: {},
            amount: null,
            transactionPassword: null
        }
    }
    componentWillMount () {
        request.checkUserBank({
            data:{},
            ok:(res) => {
                let result = res.data || [];
                let backCardList = result.map(item => ({label:item.bankName,value:item.bankNum}));
                let backCardActive = result.filter((item) => item.isDefault == 1)[0];
                setUserInfo(() => {
                    getUserInfo((userinfo) => {;
                        this.setState({
                            backCardList,
                            backCardActive:backCardActive?backCardActive.bankNum:null,
                            dongObj: {
                                number: userinfo.dong,
                                price: userinfo.dongPrice,
                                total: (userinfo.dong*userinfo.dongPrice).toFixed(2)
                            }
                        });
                    });
                })
            }
        })
    }
    handleSubmit = () => {
        const {backCardActive,amount,transactionPassword} = this.state;
        if(!amount||!transactionPassword) {
            Toast.fail('请输入兑换数量及密码', 1);
            return false;
        }
        if(!backCardActive) {
            Toast.fail('请选择银行卡', 1);
            return false;
        }
        request.dongCash({
            data: {amount,transactionPassword,bankNum:backCardActive},
            ok:(res) => {
                Toast.success('盾兑换成功', 1,() => openurl('back'));
            },
            error: ()=> {
                Toast.offline('网络异常', 2,() => window.location.reload(true));
            }
        });
    }
    render() {
        const {backCardList,backCardActive,dongObj:{number,price,total},amount,transactionPassword} = this.state;
        return (
            <div className='dong'>
                <p className="remarks">可卖数量:{number}</p>
                <InputLabel
                    value={amount}
                    type="number"
                    placeholder="请输入卖出数量"
                    onChange={amount => {
                        let num = amount > number?number:amount?parseInt(amount):null;
                        this.setState({
                            amount: num,
                            dongObj:_.assign(this.state.dongObj,{
                                total: (((number-num||0)*price)||0).toFixed(2)
                            })
                        });
                    }}
                >计划卖出：</InputLabel>
                <p className="remarks">单价:{price}</p>
                <InputLabel
                    value={transactionPassword}
                    type="password"
                    placeholder="请输入交易密码"
                    maxLength={20}
                    onChange={transactionPassword => this.setState({transactionPassword})}
                >交易密码：</InputLabel>
                <p className="remarks">可卖价值:{total||0}元</p>
                <h2 className="title">请选择收款银行卡信息</h2>
                <SelectLabel
                    list={backCardList}
                    value={backCardActive}
                    placeholder="请选择银行卡"
                    onChange={value => console.log(value)}
                ></SelectLabel>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >确定</Button>
            </div>
        );
    }
}