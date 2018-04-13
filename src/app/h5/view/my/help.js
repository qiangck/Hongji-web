'use strict';
import React,{Component} from 'react';
import { Tabs } from 'antd-mobile';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    jfRender() {
        return (
            <Tabs
                tabs={[{ title: '如何使用'},{ title: '如何获得'},{ title: '扣减规则'}]}
                initialPage={0}
                renderTabBar={(type) => {
                    let active = type.activeTab;
                    return (
                        <div className='navBar'>
                            <ul className='content'>
                                {type.tabs&&type.tabs.map((item, index) => {
                                    return (
                                        <li onClick={()=>{
                                            active != index && type.goToTab(index)
                                        }}><p className={active == index ? 'active' : ''}>{item.title}</p></li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                }}
            >
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>1.选择【首页】-> 点击【积分】按钮，然后选择兑换银行卡，输入兑换积分数量。最后，确认无误后点击兑换即可。后台审核通过后即回款到选择的银行账户。</li>
                            <li>2.积分兑现：1:1，即1积分等于1元人民币。兑现时70%提为现金，10%为税金，15%以10：1的比例转换成泓济商标原始股。如：提现1000积分则记录提现金额为750元，商标原始股增加15股。</li>
                        </ul>
                    </div>
                </div>
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>1.初级微股东享受3%新增人员积分见点奖励。</li>
                            <li>2.中级微股东享受7%新增团队见点奖励，享受下面初级微股东团队4%的见点奖励。</li>
                            <li>3.高级微股东享受12%新增团队见点奖励，享受下面直接中级微股东团队5%的见点奖励，和直接初级微股东团队9%的见点奖励。</li>
                            <li>4.签到可以获得积分。以一个月为一个周期，每月1号到9号，每天签到一次可得0.1积分，10号签到一次可得5积分；每月11号至19号，每天签到一次可得0.1积分，20号签到一次可得10积分；每月21号至29号，每天签到一次可得0.1积分，30号签到一次可得15积分。</li>
                            <li>签到没有时间限制，每天的任何时间点都可以签到。</li>
                        </ul>
                    </div>
                </div>
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>积分兑换审核通过后，系统自动扣除。</li>
                        </ul>
                    </div>
                </div>
            </Tabs>
        )
    }
    dongRender() {
        return (
            <Tabs
                tabs={[{ title: '如何使用'},{ title: '如何获得'},{ title: '释放速度'}]}
                initialPage={0}
                renderTabBar={(type) => {
                    let active = type.activeTab;
                    return (
                        <div className='navBar'>
                            <ul className='content'>
                                {type.tabs&&type.tabs.map((item, index) => {
                                    return (
                                        <li onClick={()=>{
                                            active != index && type.goToTab(index)
                                        }}><p className={active == index ? 'active' : ''}>{item.title}</p></li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                }}
            >
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>1.选择【首页】-> 点击【数字货币】按钮，然后点击右上角提币按钮，输入GSC数量和转出地址，确认无误后点击立即提币即可。</li>
                        </ul>
                    </div>
                </div>
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>1.升级为初级微股东，赠送价值2000元GSC(以实时价格计算)。</li>
                            <li>2.升级为中级微股东，赠送价值10000元GSC(以实时价格计算)。</li>
                            <li>3.升级为高级微股东，赠送价值20000元GSC(以实时价格计算)。</li>
                        </ul>
                    </div>
                </div>
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>以天为单位，1%余额定返。</li>
                            <li>推荐一名初级微股东余额定返速度增加0.1‰;</li>
                            <li>推荐一名中级微股东余额定返速度增加0.5‰;</li>
                            <li>推荐一名高级微股东余额定返速度增加1‰;</li>
                        </ul>
                    </div>
                </div>
            </Tabs>
        )
    }
    volumeRender() {
        return (
            <Tabs
                tabs={[{ title: '如何使用'},{ title: '如何获得'}]}
                initialPage={0}
                renderTabBar={(type) => {
                    let active = type.activeTab;
                    return (
                        <div className='navBar'>
                            <ul className='content'>
                                {type.tabs&&type.tabs.map((item, index) => {
                                    return (
                                        <li onClick={()=>{
                                            active != index && type.goToTab(index)
                                        }}><p className={active == index ? 'active' : ''}>{item.title}</p></li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                }}
            >
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>可以转给用于兑换河南泓济智能科技股份有限公司在香港国际知识产权交易中心上市的商标原始股。</li>
                        </ul>
                    </div>
                </div>
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>积分提现时，15%的积分按照10：1的比例转换成商标原始股。比如：提现1000积分，自动转换成15股商标原始股。</li>
                        </ul>
                    </div>
                </div>
            </Tabs>
        )
    }
    busses() {
        const {id} = this.props.params;
        switch(id) {
            case '1':
                return this.jfRender();
            case '2':
                return this.dongRender();
            case '3':
                return this.volumeRender();
            default:
                return this.jfRender();
        }
    }
    render() {
        return (
            <div className='help'>
                {this.busses()}
            </div>
        );
    }
}