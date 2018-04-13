'use strict';
import React,{Component} from 'react';
import { List, WhiteSpace, Button, Modal } from 'antd-mobile';
import { getUserInfo, openurl } from 'util';
import { DefatulFace } from 'comp';
import { login } from 'method';
import './index.less';
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null
        }
    }
    componentDidMount () {
        getUserInfo((userinfo) => this.setState({userinfo}));
    }
    render() {
        const {userinfo} = this.state;
        return (
            <div className='user'>
                {userinfo&&<List>
                    <Item
                        arrow="horizontal"
                        thumb={(<DefatulFace className="_face" url={userinfo.avatarUrl}/>)}
                        multipleLine
                        onClick={() => openurl('basic')}
                    >
                        {userinfo.nickName}<Brief>{userinfo.userName}</Brief>
                    </Item>
                </List>}
                <WhiteSpace size="md" />
                <List>
                    <Item arrow="horizontal" onClick={() => openurl('detailed')}>信息一览</Item>
                    <Item arrow="horizontal" onClick={() => openurl('authentication')}>实名认证</Item>
                    <Item arrow="horizontal" onClick={() => openurl('address')}>地址管理</Item>
                    <Item arrow="horizontal" onClick={() => openurl('bankCard')}>银行卡管理</Item>
                    <Item arrow="horizontal" onClick={() => openurl('safetySafety')}>账户安全</Item>
                    <Item arrow="horizontal" onClick={() => openurl('safetySetUp')}>设置</Item>
                </List>
                <Button
                    type="primary"
                    className="button"
                    onClick={() => alert('注销', '是否退出账户?', [
                        {text: '取消', onPress: () => {}},
                        {text: '确定', onPress: () => login.logout()}
                    ])}
                >退出登录</Button>
            </div>
        );
    }
}