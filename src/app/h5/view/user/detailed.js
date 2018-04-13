'use strict';
import React,{Component} from 'react';
import { List, WhiteSpace, Button } from 'antd-mobile';
import { request } from 'util';
import './index.less';
const Item = List.Item;
const Brief = Item.Brief;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null
        }
    }
    componentWillMount () {
        request.getUserExtInfo({
            ok:(res) => this.setState({userinfo: res.data})
        });
    }
    componentDidMount () {}
    render() {
        const {userinfo} = this.state;
        return (
            <div className='user user_detailed'>
                {userinfo&&<List>
                    <Item extra={userinfo.nickName||'暂无'}>姓名</Item>
                    <Item extra={userinfo.idCard||'暂无'}>身份证号</Item>
                    <Item extra={userinfo.userName||'暂无'}>手机号</Item>
                </List>}
                <WhiteSpace size="md" />
                {userinfo&&<List>
                    <Item extra={userinfo.bankName||'暂无'}>开户行</Item>
                    <Item extra={userinfo.bankNum||'暂无'}>卡号</Item>
                </List>}
                <WhiteSpace size="md" />
                {userinfo&&<List>
                    <Item extra={userinfo.parentId||'暂无'}>所属微股东账号</Item>
                    <Item extra={userinfo.parentname||'暂无'}>所属微股东姓名</Item>
                </List>}
            </div>
        );
    }
}