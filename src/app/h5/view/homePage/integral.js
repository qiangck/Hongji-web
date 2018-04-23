'use strict';
import React,{Component} from 'react';
import { Button, Toast, Modal, InputItem  } from 'antd-mobile';
import { InputLabel, SelectLabel } from 'comp';
import { request, setUserInfo, getUserInfo, openurl } from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backCardList: null,
            backCardActive: null,
            integration: null,
            integrationNum: null,
            transactionPassword: null,
            visible: false
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
                            integration:parseInt(userinfo.integration)
                        });
                    });
                });
            }
        })
    }
    handleSubmit = () => {
        const {backCardList,backCardActive,integrationNum} = this.state;
        if(integrationNum==null) {
            Toast.fail('请输入兑换积分数量,为100的倍数', 1);
            return false;
        }
        if(integrationNum%100!=0) {
            Toast.fail('请输人100的整数倍积分', 1);
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
        const {backCardList,backCardActive,integration,integrationNum,transactionPassword} = this.state;
        return (
            <div className='integral'>
                <Modal
                    visible={this.state.visible}
                    transparent
                    maskClosable={false}
                    title="交易密码"
                    footer={[
                        {text: '取消',onPress: () => {
                            this.setState({visible:false,transactionPassword:null});
                        }},
                        {text: '确定',onPress: () => {
                            request.integrationCash({
                                data: {
                                    integrationNum,
                                    bankNum: backCardActive,
                                    transactionPassword
                                },
                                ok:(res) => {
                                    this.setState({visible:false,transactionPassword:null})
                                    Toast.success('积分捐献成功', 1,() => openurl('back'));
                                },
                                error: ()=> {
                                    Toast.offline('网络异常', 2,() => window.location.reload(true));
                                }
                            })
                        }}
                    ]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <p>请输入交易密码进行支付</p>
                    <InputItem
                        type="password"
                        onChange={(transactionPassword) => {this.setState({transactionPassword})}}
                        style={{border:'1px solid #ccc'}}
                    />
                </Modal>
                <SelectLabel
                    list={backCardList}
                    value={backCardActive}
                    placeholder="请输入转出数量"
                    onChange={backCardActive => this.setState({backCardActive})}
                >捐献银行卡：</SelectLabel>
                <InputLabel
                    value={integrationNum}
                    type="number"
                    placeholder="请输入转出数量"
                    onChange={value => {
                        this.setState({integrationNum: value > integration?integration:value?parseInt(value):null})
                    }}
                >捐赠积分额：</InputLabel>
                <InputLabel
                    type="isText"
                    value={integration&&`${parseInt(integration)}元`}
                >可捐积分额：</InputLabel>
                <p className="use">积分余额：{integration}<a onClick={() => {
                    this.setState({integrationNum:integration});
                }}>全部捐赠</a></p>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >确定</Button>
                <p className="remarks">预计72小时内到账</p>
            </div>
        );
    }
}