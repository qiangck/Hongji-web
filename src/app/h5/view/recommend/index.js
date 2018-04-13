'use strict';
import React,{Component} from 'react';
import { Button, Toast } from 'antd-mobile';
import Clipboard from 'clipboard';
import {request,getUserInfo,copy,openurl} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null,
            qrcodeName: null,
        }
    }
    componentWillMount () {
        getUserInfo((userinfo) => this.setState({userinfo}));
        request.getAppVersion({
            data: {tuijian:'Y'},
            ok:(res) => {
                this.setState({qrcodeName: res.data.imageurl});
            }
        });
    }
    componentDidMount() {
        let clipboard = new Clipboard('.btn');
        clipboard.on('success', function(e) {
            Toast.success('复制成功',1);
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
            Toast.success('复制失败，请选择拷贝复制',1);
        });
    }
    render() {
        const {qrcodeName,userinfo} = this.state;
        return (
            <div className='recommend'>
                <div className="qrcode">
                    {qrcodeName&&<img onError={(e)=>{
                        e.target.src="./resource/images/morenshangpin.png";
                    }} src={window._imgHost + qrcodeName}/>}
                    {!qrcodeName&&<img src='./resource/images/morenshangpin.png'/>}
                </div>
                <div className="userid">
                    <input id="foo" value={userinfo.invitecode}/>
                    <button className="btn" data-clipboard-target="#foo">点击复制邀请码</button>
                </div>
                <Button
                    type="primary"
                    className="button"
                    onClick={()=>openurl('back')}
                >完成</Button>
            </div>
        );
    }
}