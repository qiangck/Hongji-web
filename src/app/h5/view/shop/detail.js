'use strict';
import React,{Component} from 'react';
import { Toast } from 'antd-mobile';
import {Adjust} from 'comp';
import {request,openurl,getUserInfo} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            value: 1
        }
    }
    componentWillMount() {
        const {productCode,price,name,imgUrl} = this.props.location.state;
        let address = "";
        address = '郑州市高新技术产业开发区冬青街26号河南省电子商务产业园5号楼4楼02室';
        getUserInfo((userinfo) => {
            if(userinfo) {
                request.userAddressList({
                    data: {},
                    ok: (res) => {
                        let data = res.data;
                        for(let i = 0;i < data.length;i++) {
                            if(data[i].isDefault) {
                                address = data[i].userAddress;
                                break;
                            }
                        }
                        this.setState({ product:{productCode,price,name:decodeURI(name),imgUrl,address}});
                    }
                });
            } else {
                this.setState({ product:{productCode,price,name:decodeURI(name),imgUrl,address}});
            }
        });
    }
    addShopCart = (bool) => {
        if(!bool) {
            Toast.success('加入购物车成功', 1);
        }
        const {name,price,productCode,imgUrl} = this.state.product;
        const {value} = this.state;
        let json = {
            value,
            name,
            imgUrl,
            price,
            productCode
        }
        if(localStorage.getItem('cart')) {
            let jsonParse = JSON.parse(localStorage.getItem('cart'));
            if(jsonParse[json.productCode]) {
                jsonParse[json.productCode]['value'] = jsonParse[json.productCode].value + json.value;
                localStorage.setItem("cart", JSON.stringify(jsonParse));
            } else {
                jsonParse[json.productCode] = {
                    value: json.value,
                    imgUrl: json.imgUrl,
                    name: json.name,
                    price: json.price
                }
                localStorage.setItem("cart", JSON.stringify(jsonParse));
            }
        } else {
            let cartParam = {};
            cartParam[json.productCode] = {
                value: json.value,
                imgUrl: json.imgUrl,
                name: json.name,
                price: json.price
            }
            localStorage.setItem("cart", JSON.stringify(cartParam));
        }
    }
    render() {
        const {product} = this.state; 
        return (
            <div className='shop_detail'>
                <div className='cartColum'>
                    <a className='myCard' onClick={()=> {
                        this.addShopCart(true);
                        setTimeout(()=>{
                            openurl('shopCart');
                        },500);
                    }}>立即购买</a>
                    <a className='addCard' onClick={this.addShopCart.bind(this,false)}>加入购物车</a>
                </div>
                <div className='product'>
                    <div className="productImage">
                        {product&&<img src={product.imgUrl} onError={(e) => {
                         }}/>}
                    </div>
                    <div className='productInfo'>
                        {product&&<div className='productTitle'>{product.name}</div>}
                        <div className='productPrice'>
                            {product&&<span className='priceNumber'>{product.price}购物券</span>}
                        </div>
                    </div>
                    <div className='productTake'>
                        <div className='productNumber'>
                            <span className='sendMsg'>数量</span>
                            <Adjust onChange={(value)=>{
                                this.setState({value})
                            }}/>
                        </div>
                        <div className='productSend'>
                            <span className='sendMsg'>送至</span>
                            <div className='sendAddress'>
                                {product&&<span>{product.address}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='productService'>
                        <div className='productTip'>
                            <i></i><span>泓济发货</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}