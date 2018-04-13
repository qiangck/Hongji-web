'use strict';
import React,{Component} from 'react';
import { List, WhiteSpace, Button, InputItem } from 'antd-mobile';
import { getUserInfo, request, openurl } from 'util';
import './index.less';
const Item = List.Item;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null,
            nickName: null,
            idCard: null
        }
    }
    componentWillMount () {
        getUserInfo((userinfo) => this.setState({userinfo}));
    }
    componentDidMount () {}
    handleSubmit = () => {
        const {nickName,idCard} = this.state;
        request.updateUser({
            data: {nickName,idCard},
            ok:(res) => {
                openurl('back');
            }
        })
    }
    contentRender () {
        const {userinfo} = this.state;
        if(userinfo&&(userinfo.idCard||userinfo.nickName)) {
            return (
                <List className="content">
                    <Item extra={userinfo&&userinfo.nickName}>姓名</Item>
                    <Item extra={userinfo.idCard}>身份证号</Item>
                </List>
            )
        } else {
            return (
                <div>
                    <List className="content">
                        <InputItem
                            type="text"
                            placeholder="请输入您的姓名"
                            onChange={nickName => this.setState({nickName})}
                        >姓名</InputItem>
                        <InputItem
                            type="text"
                            placeholder="请输入您的身份证号"
                            onChange={idCard => this.setState({idCard})}
                        >身份证号</InputItem>
                    </List>
                    <Button
                        type="primary"
                        className="button"
                        onClick={this.handleSubmit}
                    >立即认证</Button>
                </div>
            )
        }
    }
    render() {
        return (
            <div className='user user_authentication'>
                <img className="bander" src={'./resource/images/img_shimingrenzheng.png'}/>
                {this.contentRender()}
            </div>
        );
    }
}