'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import action from 'action';
import {bindActionCreators} from 'redux';
import {Adjust} from 'comp';
import {loading} from 'method';
import {request,openurl,isObjectNull} from 'util';
import { Icon,Toast,Modal,InputItem } from 'antd-mobile';
import './index.less';
const alert = Modal.alert;
@connect(
    null,
    (dispatch)=>{return {actions:bindActionCreators(action.charge.creator,dispatch)}}
)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {},
            addressList: [],
            total: 0,
            number: 0,
            transcationPwd: null,
            visible: false
        }
    }
    propsParam() {
        if(!localStorage.getItem("cartRevise")) return {};
        return JSON.parse(localStorage.getItem("cartRevise"));
    }
    componentWillMount() {
        request.userAddressList({
            data: {},
            ok: (res) => {
                let data = res.data;
                let addressList = [];
                for(let i = 0;i < data.length;i++) {
                    if(data[i].isDefault) {
                        addressList.push(data[i]);
                        break;
                    }
                }
                if(addressList.length <= 0) {
                    alert('提示', '您还没有收货地址哦，赶紧去设置一个吧!', [
                        { text: '取消' ,onPress: () => {
                            openurl('back');
                        }},
                        { text: '确定', onPress: () => {
                            openurl('addressUpdata', {list:[]});
                        }},
                    ]);
                    return false;
                }
                this.setState({addressList})
            }
        });
    }
    componentDidMount() {
        if(!localStorage.getItem("cartRevise")) return;
        let list = JSON.parse(localStorage.getItem("cartRevise"));
        let total = 0;
        let number = 0;
        _.keys(list).map(item => {
            let value = list[item];
            number ++;
            if(value.checked) {
                total = total + (value.price * value.value);
            }
        });
        this.state.total = Math.floor(total * 100)/100;
        this.state.list = list;
        this.state.number = number;
        this.forceUpdate();
    }
    submit = () => {
        const {number,total,list,addressList} = this.state;
        if(total <= 0) {
            Toast.info('金额错误', 1);
            return false;
        }
        if(addressList.length <= 0) {
            Toast.info('收货地址为空', 1);
            openurl('addressUpdata', {list:[]});
            return false;
        }
        if(isObjectNull(list)) {
            Toast.info('购物车为空',2,() => openurl('back'));
            return false;
        }
        this.setState({visible:true});
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    render() {
        const {list,total,number,addressList,transcationPwd} = this.state;
        return (
            <div className='shop_confirm'>
                {addressList.length > 0&&<div className='address' onClick={() => openurl('address')}>
                    <img src="./resource/images/shouhuodizhi.png" className='location'/>
                    {addressList.map(item => {
                        return (
                            <ul className='address_content'>
                                <li>
                                    <strong className='name'>收货人：{item.name}</strong>
                                    <strong className='phone'>{item.mobile}</strong>
                                </li>
                                <li>收货地址：{item.userAddress}</li>
                            </ul>
                        )
                    })}
                    <Icon type="right" className='icon'/>
                </div>}
                <div className='cartBox'>
                    <div className='cartHead'>
                        <span className='headName'>泓济自营</span>
                    </div>
                    {_.keys(list).map(item => {
                        return (
                            <div className='cartItem' id={item}>
                                <img className='cartImage' src={list[item].imgUrl} onError={(e) => {
                                    e.target.src = './resource/images/morenshangpin.png';
                                }}/>
                                <div className='content'>
                                    <div className='name'>{list[item].name}</div>
                                    <div className='lines'>
                                        <p className='price'>{list[item].price}购物券</p>
                                        <p className='num'>x{list[item].value}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='count'>
                    <div className='total'>
                        <p>共{number}件商品</p>
                        <a>小计：<i>{total}购物券</i></a>
                    </div>
                </div>
                <div className='fixBar'>
                    <div className='total'>
                        <p>实付款：<strong>{total}购物券</strong></p>
                        <a onClick={this.submit}>提交订单</a>
                    </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    transparent
                    maskClosable={false}
                    title="交易密码"
                    footer={[
                        {text: '取消',onPress: () => {
                            this.setState({visible:false,transcationPwd:null});
                        }},
                        {text: '确定',onPress: () => {
                            let productParam = [];
                            _.keys(list).map(item => {
                                let str = '';
                                str = `${item}:${list[item].value}`;
                                productParam.push(str);
                            });
                            request.productSave({
                                data: {
                                    productCode: productParam.join('|'),
                                    integrationNum: total,
                                    num: number,
                                    transcationPwd,
                                    user_address: addressList[0].userAddress
                                },
                                ok:(res) => {
                                    this.setState({visible:false,transcationPwd:null});
                                    Toast.success('提交订单成功', 1,() => openurl('$success'));
                                }
                            })
                        }}
                    ]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <p>请输入交易密码进行支付</p>
                    <InputItem
                        type="password"
                        onChange={(transcationPwd) => {this.setState({transcationPwd})}}
                        style={{border:'1px solid #ccc'}}
                    />
                </Modal>
            </div>
        );
    }
}