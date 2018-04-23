'use strict';
import React,{Component} from 'react';
import {GoodsItem} from 'comp';
import { Checkbox,Card,Modal } from 'antd-mobile';
import {Adjust} from 'comp';
import _ from 'lodash';
import {request,openurl,isObjectNull} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: this.localFormat(),
            cartRevise: this.localFormat(),
            checkAll: true,
            total: 0
        }
    }

    componentDidMount() {
        this.total();
    }
    // 添加checked参数
    localFormat() {
        const cartList = JSON.parse(localStorage.getItem("cart"));
        let boxObj = {};
        !isObjectNull(cartList)&&_.keys(cartList).map(item => {
            let formatObj = {};
            _.assign(formatObj,cartList[item],{checked:true});
            boxObj[item] = formatObj;
        });
        return boxObj;
    }
    // 全选
    checkAll = (e) => {
        let boxObj = {};
        const {cartList} = this.state;
        if(e.target.checked) {
            this.state.cartRevise = this.state.cartList;
        } else {
            this.state.cartRevise = {};
        }
        _.keys(cartList).map(item => {
            let formatObj = {};
            _.assign(formatObj,cartList[item],{checked:e.target.checked});
            boxObj[item] = formatObj;
        });
        this.state.cartList = boxObj;
        this.state.checkAll = e.target.checked;
        this.total();
    }
    // 选择商品
    checked = (checked,id) => {
        this.state.cartList[id]['checked'] = !checked;
        let cartList = this.state.cartList;
        let checkedNum = 0;
        if(checked) {
            delete this.state.cartRevise[id];
        } else {
            this.state.cartRevise[id] = this.state.cartList[id];
        }
        _.keys(cartList).map(item => {
            if(cartList[item].checked) checkedNum++
        });
        this.state.checkAll = (_.keys(cartList).length == checkedNum);
        this.total();
    }
    // 计算总价
    total() {
        let cartList = this.state.cartList;
        let total = 0;
        _.keys(cartList).map(item => {
            let value = cartList[item];
            if(value.checked) {
                total = total + (value.price * value.value);
            }
        });
        this.state.total = Math.floor(total * 100)/100;
        this.forceUpdate();
    }
    adjust = (id, val) => {
        this.state.cartList[id]['value'] = val;
        if(this.state.cartRevise[id]) this.state.cartRevise[id] = this.state.cartList[id];
        this.total();
    }
    settlement = () => {
        const {cartList,total,cartRevise} = this.state;
        if(total<=0) return false;
        localStorage.setItem("cartRevise", JSON.stringify(cartRevise));
        localStorage.setItem("cart", JSON.stringify(cartList));
        openurl('shopConfirm');
    }
    render() {
        const product = [{
            id:1,
            productCode:"1",
            name:"浴疗包",
            price:1199,
            description:"泓济浴疗包",
            imgUrl: window._imgHost + "product/yuliaobao.jpg"
        }, {
            id:1,
            productCode:"2",
            name:"果维密码",
            price:1799,
            description:"泓济果维密码",
            imgUrl: window._imgHost + "product/guoweimima.jpg"
        }];
        const {cartList,checkAll,total,cartRevise} = this.state;
        return (
            <div className='shop_cart'>
                <div className='fixBar'>
                    <div className='total'>
                        <p>总计：<strong>{total}购物券</strong></p>
                        <a onClick={this.settlement}>去结算</a>
                    </div>
                </div>
                {!isObjectNull(cartList)&&<div className='cartBox'>
                    <div className='cartHead'>
                        <Checkbox className='cartRadio' checked={checkAll} onChange={this.checkAll}/>
                        <span className='headName'>泓济自营</span>
                    </div>
                    {_.keys(cartList).map(item => {
                        return (
                            <div className='cartItem' id={item}>
                                <Checkbox className='cartRadio' checked={cartList[item].checked} onChange={this.checked.bind(this,cartList[item].checked,item)}/>
                                <img className='cartImage' src={cartList[item].imgUrl} onError={(e) => {
                                    e.target.src = './resource/images/morenshangpin.png';
                                }}/>
                                <div className='content'>
                                    <div className='name'>{cartList[item].name}</div>
                                    <div className='lines'>
                                        <p className='price'>{cartList[item].price}购物券</p>
                                        <Adjust value={cartList[item].value} onChange={this.adjust.bind(this,item)}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
                {isObjectNull(cartList)&&<div className='cartNull'>
                    <div className='cartNull_center'>
                        <img src="./resource/images/kongxxxhdpi.png"/>
                        <div className='cartNull_text'>您还没有相关订单</div>
                    </div>
                </div>}
                <div className='recommend'>
                    <div className='resHead'>
                        <i className='leftLine'></i>为你推荐<i className='rightLine'></i>
                    </div>
                    <div className='resList'>
                        {product.map(item => (<GoodsItem onClick={()=>openurl('shopDetail',item)} {...item}/>))}
                    </div>
                </div>
            </div>
        );
    }
}