'use strict';
import React,{Component} from 'react';
import { Button, Toast, Modal } from 'antd-mobile';
import { InputLabel } from 'comp';
import { request, openurl, getUserInfo, setUserInfo } from 'util';
import '../index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gscMax: null,
            amount: null,
            monyAddren: null
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
        Modal.prompt(
            '交易密码',
            '请输入交易密码进行提币',
            transactionPassword => {
                request.gscFlowSave({
                    data:{amount,monyAddren,transactionPassword},
                    ok:(res) => {
                        Toast.info('提币成功', 1, ()=>openurl('back'));
                    },
                    error: ()=> {
                        Toast.offline('网络异常', 2,() => window.location.reload(true));
                    }
                });
            },
            'secure-text'
        )
    }
    render() {
        const {gscMax, amount} = this.state;
        return (
            <div className='blockchain'>
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