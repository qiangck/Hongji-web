'use strict';
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import action from 'action';
import {connect} from 'react-redux';
import { Button, Radio, Toast, Checkbox, Modal  } from 'antd-mobile';
import { InputLabel, SelectLabel } from 'comp';
import { request, openurl } from 'util';
import Clipboard from 'clipboard';
import _ from 'lodash';
import '../index.less';
const prompt = Modal.prompt;
@connect(
    (state) => {
        return {
            file: state.fileUpload.file,
            shoppingData: state.shopping.shoppingData
        }
    },
    (dispatch) => {return{
        saveData:bindActionCreators(action.shopping.creator.data,dispatch),
        saveFile:bindActionCreators(action.fileUpload.creator.file,dispatch)
    }}
)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = this.propsDefaulu()
    }
    propsDefaulu() {
        const {shoppingData} = this.props;
        let obj = {
            backCardList: null,
            backMoneyList: null,
            key: 0,
            isOthers: false,
            rechargeCode: new Date().getTime() + '',
            targetUser: null,
            rechargeMoney: null,
            showModal:false
        }
        if(shoppingData) {
            return _.assign({}, obj, shoppingData, {backMoneyList:null});
        } else {
            return obj;
        }
    }
    componentWillMount () {
        request.comBankList({
            data:{},
            ok:(res) => {
                let result = res.data || [];
                let backCardList = result.map(item => ({label:this.bankNameFromat(item),value:item.bankNum}));
                this.setState({backCardList});
            }
        });
        request.getMoneyType({
            data:{},
            ok:(res) => {
                let backMoneyList = res.data.map(item => ({label:item.money,value:item.money}));
                this.setState({ backMoneyList });
            }
        })
    }
    componentDidMount() {
        let clipboard = new Clipboard('.copy');
        clipboard.on('success', (e) => {
            Toast.success('复制成功',1);
            e.clearSelection();
        });
        clipboard.on('error', (e) => {
            Toast.success('复制失败，请选择手动复制',1,()=>this.setState({showModal:true}));
        });
    }
    bankNameFromat(item) {
        const {bankName,bankNum,owner} = item;
        const bankNumLen = bankNum.length;
        return `${bankName}(${bankNum.substring(bankNumLen-4,bankNumLen)})  ${owner}`;
    }
    handleSubmit = () => {
        const {backCardList, key, rechargeMoney, rechargeCode, targetUser, isOthers} = this.state;
        const {file} = this.props;
        const reg = /^[A-Za-z0-9]+$/;
        if(!rechargeMoney) {
            Toast.fail('请选择充值金额', 1);
            return false;
        }
        if(isOthers&&!targetUser) {
            Toast.fail('请输入对方账号', 1);
            return false;
        }
        if(targetUser&&!reg.test(targetUser)) {
            Toast.fail('请输入正确的账号', 1);
            return false;
        }
        if(file&&file.length<=0) {
            Toast.fail('请输上传汇款凭证', 1);
            return false;
        }
        let queryData = {
            rechargeMoney,
            companyBank: backCardList[key].value,
            rechargeCode
        }
        if(isOthers) _.assign(queryData, {targetUser});
        let param = {
            data: {},
            queryData,
            ok:(res) => {
                this.props.saveData({});
                this.props.saveFile([]);
                Toast.success('购物券兑换成功', 1,() => openurl('back'));
            }
        };
        let formData = new FormData();
        file&&formData.append("file", file);
        file&&_.assign(param, {data:formData});
        request.rechargeAdd(param);
    }
    render() {
        const {showModal,backCardList,backMoneyList,key,isOthers,rechargeCode,targetUser,rechargeMoney} = this.state;
        return (
            <div className='shopping-voucher' style={{height: `${document.documentElement.clientHeight - 45}px`}}>
                <Modal
                    visible={this.state.showModal}
                    transparent
                    maskClosable={false}
                    title="复制银行账户"
                    footer={[{text: '确定', onPress: () => {
                        this.setState({showModal:false});
                    }}]}
                >
                    <input className="copyModal" value={backCardList&&backCardList[key].value}/>
                </Modal>
                <SelectLabel
                    list={backMoneyList}
                    title="请选择金额"
                    showValue={rechargeMoney||null}
                    showDefault={rechargeMoney||null}
                    placeholder="请选择充值金额"
                    onChange={price => {
                        if(!price) return false;
                        prompt('充值数量', '请输入充值数量', [
                            { text: '确定', onPress: num => new Promise((resolve)=> {
                                if(!num||num&&num>999999) {
                                    Toast.info('请输入正确的数值', 1);
                                    return false;
                                }
                                this.setState({rechargeMoney:price*num});
                                resolve();
                            })},
                        ]);
                    }}
                >充值金额：</SelectLabel>
                <InputLabel
                    value={rechargeMoney}
                    type="number"
                    disabled
                >共计金额：</InputLabel>
                <h2 className="title">请选择商家账户</h2>
                <div className="backList">
                    {backCardList&&backCardList.map((item, index) => {
                        return (
                            <div className="_modalItem">
                                <Radio
                                    className="_radio"
                                    key={item.value}
                                    checked={key === index}
                                    onChange={e => {
                                        e.stopPropagation();
                                        this.setState({key:index});
                                    }}
                                >{item.label}</Radio>
                            </div>
                        )
                    })}
                </div>
                <div className="bankOther">
                    <input id="foo" value={backCardList&&backCardList[key].value}/>
                    <button className="copy" data-clipboard-target="#foo">点击复制银行账号</button>
                    <Checkbox
                        className="_radio"
                        checked={isOthers}
                        onChange={e => {
                            e.stopPropagation();
                            this.setState({isOthers:e.target.checked})
                        }}
                    >为他人充值</Checkbox>
                </div>
                <div className="bankCode">{rechargeCode}</div>
                {isOthers&&<div className="bankOtherId">
                    <input
                        placeholder="请输入他人的账号"
                        value={targetUser}
                        maxLength={20}
                        onChange={val=>this.setState({targetUser: val.target.value})}
                    />
                </div>}
                <div className="bankBtn">
                    <Button
                        type="primary"
                        className="button bankUpload"
                        onClick={() =>{
                            this.props.saveData(this.state);
                            openurl('shoppingVoucherUp');
                        }}
                    >上传汇款凭证</Button>
                    <Button
                        className="button bankSubimt"
                        onClick={this.handleSubmit}
                    >提交订单</Button>
                </div>
                <div className="remarks">
                    <p>注:1.请将汇款码复制到银行汇款附言。</p>
                    <p className="t">2.订单提交按时间先后审理，24小时审核通过。</p>
                    <p className="t">3.详询400-112-0258</p>
                </div>
            </div>
        );
    }
}