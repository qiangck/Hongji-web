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
                            <li>1.选择【首页】-> 点击【盾，进入交易页面。</li>
                            <li>2.输入卖出数量，选择收款银行卡，输入交易密码。</li>
                            <li>3.确认无误点击【确定】按钮即可获取卖盾收益。</li>
                            <li>说明:系统审核通过后即可到达您的银行账户。</li>
                        </ul>
                    </div>
                </div>
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>1.充值送</li>
                            <li>充值一单360元，送72盾持有资格，多单则叠加。</li>
                            <li>盾单价(1-10元)，盾卖出后，一单封顶最多可得720元回报。</li>
                            <li>温馨提示:内排期（盾单价从1元涨到10元为一个内排期）报单一次性得15盾，限前100人。</li>
                            <li>2.系统派发</li>
                            <li>开盘后（新一轮盾价周期开始日）每天释放给市场相当于前天报单数（一单为充值360元）130倍的盾，平均分配给拥有持盾资格的会员。若消费了多单，则平均分配多次。若重复消费则可持有总盾资格叠加。例如，充值2个360元的产品则可持有盾数为144。</li>
                            <li>3.盾单价</li>
                            <li>盾单价从1元到10元区间增长（只升不降），涨到10元为一个周期，再回归1元进入新周期。新周期开始，限量报单。100人一次性送15盾。依次类推，没有封顶的会员每一周期都会继续获得盾，直到封顶。</li>
                        </ul>
                    </div>
                </div>
                <div className='helpBox'>
                    <div className='helpItem'>
                        <ul className='helpContent'>
                            <li>APP内卖出，后台审核通过并回款后会根据卖出盾数做扣减。</li>
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