'use strict';
import React,{Component} from 'react';
import { Button, Toast, Modal, Flex, NoticeBar } from 'antd-mobile';
import { InputLabel, SelectLabel } from 'comp';
import { request, setUserInfo, getUserInfo, openurl } from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            value : 0.1,
            userinfo: {},
            noticeList: null,
            bannerList: null
        }
    }
    componentWillMount(){
           // 签到顶部轮播  
        request.sign_carousel({
            data:{platform: 1},
            noUserid: true,
            ok:(res) => {
                this.setState({
                    sign_carousel: res.data.map((item, index) => item.content)
                });
            },
            error:()=>{}
        });
        //  点击签到  
        request.click_checkl({
            data:{platform: 1},
            noUserid: true,
            ok:(res) => {
                this.setState({
                    click_checkl: res.data.map((item, index) => item.content)
                });
            },
            error:()=>{}
        });
        //  底部签到 
        request.bottom_checkl({
            data:{platform: 1},
            noUserid: true,
            ok:(res) => {
                this.setState({
                    bottom_checkl: res.data.map((item, index) => item.content)
                });
            },
            error:()=>{}
        });
        //  底部今天签到 
        request.tody_checkl({
            data:{platform: 1},
            noUserid: true,
            ok:(res) => {
                this.setState({
                    tody_checkl: res.data.map((item, index) => item.content)
                });
            },
            error:()=>{}
        });
    }
    click_check = () => {
        Toast.success('签到成功', 1);
        const {userid} = this.state.product;
        let json = {
            value,
            userid
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
    sign_carousel_head (){
        request.sign_carousel({
            data: {},
            ok:(res) => {
                let result = res.signtop;
                console.log(result)
            }
        })
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
                            integration:parseInt(userinfo.integration)
                        });
                    });
                });
            }
        })
    }
    render() {
        const {result} = this.state;
        return (
            <div className='sign_page' style={{height: document.documentElement.clientHeight - 45}}>   
                {/* 头部 */}
                <div className='head_background'>
                    <img src="./resource/images/icon_signbg.png"/>
                    <div className="receive_integral">
                       <img src="./resource/images/icon_text.png"/>
                    </div>
                    <NoticeBar className="rolling_information"><marquee direction="up">{result}</marquee></NoticeBar>
                    {/* 点击签到 */}
                    {/* <div className="click_check" onClick={this.click_check}>
                        <img src='./resource/images/icon_signwei.png'/>
                    </div> */}
                    <div className="click_check">
                        <img src='./resource/images/icon_signjinbi.png'/>
                    </div>
                </div>
                {/* 已领积分 */}                
                <div className="collar_integral">
                    <p>已领取积分：&nbsp;&nbsp;<span>0</span></p>
                </div>
                {/* 签到列表 */}
                <div className="sign_list">
                    <Flex className="buttom">
                        <Flex.Item className="everyday_sign" onClick={()=>openurl('Integral_flow')}>
                            <p className="_icon">
                                <img src='./resource/images/icon_signxiaoguo.png'/>
                            </p>
                            <p className="_text">已签到</p>
                            <p className="_text">4-11</p>
                        </Flex.Item>
                        <Flex.Item className="everyday_sign" onClick={()=>openurl('Integral_flow')}>
                            <p className="_icon">
                                <img src='./resource/images/icon_signxiaoguo.png'/>
                            </p>
                            <p className="_text">未签到</p>
                            <p className="_text">4-11</p>
                        </Flex.Item>
                        {/* 今天签到情况 */}
                        <Flex.Item className="everyday_sign" onClick={()=>openurl('Integral_flow')}>
                            <p className="_icon">
                                <img src='./resource/images/icon_signxiaoguo.png'/>
                            </p>
                            <p className="_text">未签到</p>
                            <p className="_text">4-11</p>
                        </Flex.Item>
                        {/* 后两天签到情况 */}
                        <Flex.Item className="everyday_sign" onClick={()=>openurl('Integral_flow')}>
                            <p className="_icon">
                                <img src='./resource/images/icon_signwei.png'/>
                            </p>
                            <p className="_text">未签到</p>
                            <p className="_text">4-11</p>
                        </Flex.Item>
                        <Flex.Item className="everyday_sign" onClick={()=>openurl('Integral_flow')}>
                            <p className="_icon">
                                <img src='./resource/images/icon_signwei.png'/>
                            </p>
                            <p className="_text">未签到</p>
                            <p className="_text">4-11</p>
                        </Flex.Item>    
                    </Flex>
                </div>
            </div>
        );
    }
}