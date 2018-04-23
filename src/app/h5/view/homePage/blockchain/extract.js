'use strict';
import React,{Component} from 'react';
import { Button, Toast, Modal, InputItem } from 'antd-mobile';
import { InputLabel } from 'comp';
import { request, openurl, getUserInfo, setUserInfo } from 'util';
import '../index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gscMax: null,
            amount: null,
            monyAddren: null,
            transactionPassword: null,
            visible: false
        }
    }
    componentWillMount () {}
    componentDidMount () {
        setUserInfo(() => {
            getUserInfo((userinfo) => this.setState({gscMax:parseInt(userinfo.gsc_num||0)}));
        });
    }
    handleSubmit = () => {
        const {amount, monyAddren} = this.state;
        if(amount==null) {
            Toast.fail('请填写提币数量', 1);
            return false;
        }
        if(amount<=0) {
            Toast.fail('提币数量需大于0', 1);
            return false;
        }
        if(!monyAddren) {
            Toast.fail('请填写提币地址', 1);
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
        const {gscMax, amount, monyAddren,transactionPassword} = this.state;
        return (
            <div className='blockchain'>
                <Modal
                    visible={this.state.visible}
                    transparent
                    maskClosable={false}
                    title="交易密码"
                    footer={[
                        {text: '取消',onPress: () => {
                            this.setState({visible:false,transactionPassword:null})
                        }},
                        {text: '确定',onPress: () => {
                            request.gscFlowSave({
                                data:{amount,monyAddren,transactionPassword},
                                ok:(res) => {
                                    this.setState({visible:false});
                                    Toast.info('提币成功', 1, ()=>openurl('back'));
                                },
                                error: ()=> {
                                    Toast.offline('网络异常', 2,() => window.location.reload(true));
                                }
                            });
                        }}
                    ]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <p>请输入交易密码进行提币</p>
                    <InputItem
                        type="password"
                        onChange={(transactionPassword) => {this.setState({transactionPassword})}}
                        style={{border:'1px solid #ccc'}}
                    />
                </Modal>
                <InputLabel
                    value={amount}
                    type="number"
                    placeholder="请输入提币数量"
                    onChange={value => {
                        this.setState({amount: value > gscMax?gscMax:value?parseInt(value):null})
                    }}
                >数量：</InputLabel>
                <InputLabel
                    type="text"
                    maxLength={20}
                    placeholder="请输入提币地址"
                    onChange={val => this.setState({monyAddren:val})}
                >地址：</InputLabel>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >立即提币</Button>
            </div>
        );
    }
}