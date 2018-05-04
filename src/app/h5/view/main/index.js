'use strict';
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import action from 'action';
import {connect} from 'react-redux';
import { Tabs, Button, Toast, Flex, NoticeBar } from 'antd-mobile';
import { getUserInfo, setUserInfo, openurl, request, isObjectNull} from 'util';
import { DefatulFace } from 'comp';
import Shop from '../shop';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import './index.less';
@connect(
    null,
    (dispatch) => {return{
        saveData:bindActionCreators(action.shopping.creator.data,dispatch)
    }}
)
export default class extends Component {
    constructor(props) {
        super(props);
        let tabIndex = sessionStorage.getItem("tabIndex");
        this.state = {
            initialPage: tabIndex&&parseInt(tabIndex)||0,
            active: tabIndex&&parseInt(tabIndex)||0,
            userinfo: {},
            noticeList: null,
            bannerList: null
        }
    }
    componentWillMount(){
        setUserInfo(()=>{
            getUserInfo((userinfo) => {
                this.setState({userinfo});
            });
        });
        this.props.saveData({});
        request.noticeList({
            data:{platform: 1},
            noUserid: true,
            ok:(res) => {
                this.setState({
                    noticeList: res.data.map((item, index) => item.content)
                });
            },
            error:()=>{}
        });
        request.bannerList({
            data: {limit:10,page:1},
            noUserid: true,
            ok:(res) => {
                this.setState({bannerList:res.data});
                new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    autoplay: {
                        delay: 10000
                    }
                });
            },
            error:()=>{}
        });
    }
    numFormat = (text, num) => {
        const {userinfo} = this.state;
        return !isObjectNull(userinfo)?userinfo[text]&&userinfo[text].toFixed(2):0;
    }
    render() {
        const {initialPage, active, userinfo, noticeList, bannerList} = this.state;
        const isNull = !isObjectNull(userinfo||{});//成功:true,失败:false
        return (
            <div className="main">
                <Tabs
                    tabs={[
                        {title: '首页', index: 0},
                        {title: '商城', index: 1},
                        {title: '我的', index: 2}
                    ]} 
                    renderTab={tab => {
                        switch(active) {
                            case 0:
                                return (
                                    <div className="tabItem">
                                        {active==tab.index&&<img className="_home" src="./resource/images/icon-shouyedianji.png"/>}
                                        {tab.index==1&&<img src="./resource/images/icon-shangchengmoren.png"/>}
                                        {tab.index==2&&<img src="./resource/images/icon-wodemoren.png"/>}
                                        <span>{tab.title}</span>
                                    </div>
                                )
                            case 1:
                                return (
                                    <div className="tabItem">
                                        {active==tab.index&&<img src="./resource/images/icon-shangxhengdianji.png"/>}
                                        {tab.index==0&&<img className="_home" src="./resource/images/icon-shouyemoren.png"/>}
                                        {tab.index==2&&<img src="./resource/images/icon-wodemoren.png"/>}
                                        <span>{tab.title}</span>
                                    </div>
                                )
                            case 2:
                                return (
                                    <div className="tabItem">
                                        {active==tab.index&&<img src="./resource/images/icon-wodedianji.png"/>}
                                        {tab.index==0&&<img className="_home" src="./resource/images/icon-shouyemoren.png"/>}
                                        {tab.index==1&&<img src="./resource/images/icon-shangchengmoren.png"/>}
                                        <span>{tab.title}</span>
                                    </div>
                                )
                        }
                    }}
                    initialPage={initialPage}
                    onChange={(item, index)=>{
                        sessionStorage.setItem("tabIndex", index);
                        this.setState({active: index});
                    }}
                    swipeable={false}
                    animated={false}
                    tabBarPosition="bottom"
                >
                    <div className="tabs">
                        <div className="homePage">
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    {bannerList&&bannerList.map(item => (
                                        <div className="swiper-slide">
                                            <img src={item.imgUrl}  data-key={item.id} style={{width: '100%'}} onError={(e) => {
                                                e.target.src = './resource/images/img_banner.png';
                                            }}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="index">
                                <div className="header">
                                    <div className="header_box clearfloat">
                                        <div className="header_left">
                                            <div className="_user clearfloat">
                                                <div className="_face" onClick={()=>openurl('user')}>
                                                    <DefatulFace url={isNull?userinfo.avatarUrl:null}/>
                                                    {userinfo.roleType==1&&<span className="v"><img src="./resource/images/v1.svg"/></span>}
                                                    {userinfo.roleType==2&&<span className="v"><img src="./resource/images/v2.svg"/></span>}
                                                    {userinfo.roleType==3&&<span className="v"><img src="./resource/images/v3.svg"/></span>}
                                                </div>
                                                <div className="_userinfo">
                                                    {isNull&&<p className="_name">{userinfo.nickName}</p>}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="header_right">
                                            <p className="_phone">账号:{userinfo.userName}                                                    {isNull&&<div>
                                                        {userinfo.idCard&&<span className="_status">已认证</span>}
                                                        {!userinfo.idCard&&<span className="_status">未认证</span>}
                                                    </div>}
                                                    {!isNull&&<span className="_name">未登录</span>}</p>

                                            <p><span className="label">封顶积分:</span><span className="value">{isNull?userinfo.holdIntNum:0}</span></p>
                                            <p><span className="label">结余积分:</span><span className="value">{this.numFormat('holdDongNum')}</span></p>
                                        </div>
                                    </div>
                                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0' } }}>{noticeList&&noticeList.join(' ')}</NoticeBar>
                                </div>
                                <ul className="content">
                                    <li className="jf">
                                        <div className="box" onClick={()=>openurl('integral')}>
                                            <span className="box_title">
                                                <img
                                                    className="box_title_icon"
                                                    src='./resource/images/icon_jife.png'
                                                />积分</span>
                                            <span className="box_num">{this.numFormat('integration')}</span>
                                        </div>
                                    </li>
                                    <li className="sbg">
                                        <div className="box" onClick={()=>openurl('serviceVoucher')}>
                                            <p className="box_title">
                                                <img
                                                    className="box_title_icon"
                                                    src='./resource/images/icon_shop_gu.png'
                                                />商标股</p>
                                            <p className="box_subtitle">{this.numFormat('ticket')}</p>
                                        </div>
                                    </li>
                                    <li className="gwj">
                                        <div className="box"  onClick={()=>openurl('shoppingVoucher')}>
                                            <p className="box_title">
                                                <img
                                                    className="box_title_icon"
                                                    src='./resource/images/icon_quan.png'
                                                />￥</p>
                                            <p className="box_subtitle">{this.numFormat('shopcoin')}</p>
                                        </div>
                                    </li>
                                    <li className="td">
                                        <div className="box" onClick={()=>openurl('team')}>
                                            <p className="box_title">
                                                <img
                                                    className="box_title_icon"
                                                    src='./resource/images/icon_wodetuandui .png'
                                                />
                                            </p>
                                            <p className="box_subtitle">我的团队</p>
                                        </div>
                                    </li>
                                    <li className="szhb">
                                        <div className="box" onClick={()=>openurl('blockchain')}>
                                            <p className="box_title">
                                                <img
                                                    className="box_title_icon"
                                                    src='./resource/images/icon_chongzhi.png'
                                                />数字货币</p>
                                            <p className="box_subtitle">{this.numFormat('gsc_num')}</p>
                                        </div>
                                    </li>
                                    <li className="std">
                                        <div className="box" onClick={()=>openurl('store')}>
                                            <p className="box_title">
                                                <img
                                                    className="box_title_icon"
                                                    src='./resource/images/icon_dian.png'
                                                />
                                            </p>
                                            <p className="box_subtitle">实体店</p>
                                        </div>
                                    </li>
                                    <li className="tj">
                                        <div className="box" onClick={()=>openurl('recommend')}>
                                            <p className="box_title">
                                                <img
                                                    className="box_title_icon"
                                                    src='./resource/images/icon_tuijian.png'
                                                />
                                            </p>
                                            <p className="box_subtitle">我要推荐</p>
                                        </div>
                                    </li>                             
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tabs"><Shop/></div>


                    <div className="tabs">
                        <div className="my">
                            <div className="header">
                                <img src="./resource/images/img_bg_wode.jpg"/>
                                <div className="user_info" onClick={()=>openurl('user')}>
                                    <div className="_face"><DefatulFace url={isNull?userinfo.avatarUrl:null}/></div>
                                    <div className="user_phone">{userinfo.userName}</div>
                                    {isNull&&userinfo.idCard&&<div className="_authentication">已认证<span>></span></div>}
                                    {(!isNull||!userinfo.idCard)&&<div className="_authentication">未认证<span>></span></div>}
                                </div>
                            </div>
                            <Flex className="content">
                                <Flex.Item onClick={()=>openurl('myDetail/1')}>
                                    <p className="_icon">
                                        <img src='./resource/images/icon_wode_jifen.png'/>
                                    </p>
                                    <p className="_text">积分流水</p>
                                </Flex.Item>
                                <Flex.Item onClick={()=>openurl('myDetail/3')}>
                                    <p className="_icon">
                                        <img src='./resource/images/icon_wode_fuwuquan.png'/>
                                    </p>
                                    <p className="_text">商标股</p>
                                </Flex.Item>
                                <Flex.Item onClick={()=>openurl('order/1')}>
                                    <p className="_icon">
                                        <img src='./resource/images/icon-daishoukuanxxxhdpi.png'/>
                                    </p>
                                    <p className="_text">待收货</p>
                                </Flex.Item>
                                <Flex.Item onClick={()=>openurl('order/2')}>
                                    <p className="_icon">
                                        <img src='./resource/images/icon-wodedingdanxxxhdpi.png'/>
                                    </p>
                                    <p className="_text">我的订单</p>
                                </Flex.Item>
                            </Flex>
                            <div className="line"></div>
                            <Flex className="content">
                                <Flex.Item onClick={()=>openurl('recharge')}>
                                    <p className="_icon">
                                        <img src='./resource/images/icon_daifukuan.png'/>
                                    </p>
                                    <p className="_text">充值记录</p>
                                </Flex.Item>   
                                <Flex.Item onClick={()=>openurl('running_water')}>
                                    <p className="_icon">
                                        <img src='./resource/images/icontibi2x.png'/>
                                    </p>
                                    <p className="_text">提币流水</p>
                                </Flex.Item>
                                {/**<Flex.Item  onClick={()=>openurl('sign')}>
                                    <p className="_icon">
                                        <img src='./resource/images/iconqiandao2x.png'/>
                                    </p>
                                    <p className="_text">签到</p>
                                </Flex.Item>**/}
                                <Flex.Item>
                                </Flex.Item>
                                <Flex.Item>
                                </Flex.Item>
                            </Flex>
                            <div className="invitation" onClick={()=>openurl('recommend')}>
                                <img src='./resource/images/img_banner_wode.jpg'/>
                            </div>
                            <div className="serviceMobile">
                                <img src='./resource/images/Shape.png'/>客户服务:400-112-0258
                            </div>
                        </div>
                    </div>



                </Tabs>
            </div>
        );
    }
}