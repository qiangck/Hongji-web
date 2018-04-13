'use strict';
import React,{Component} from 'react';
import {request,format} from 'util';
import { List, WhiteSpace } from 'antd-mobile';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }
    componentDidMount() {
        const {userId} = this.props;
        request.teamInfo({
            data: {userId},
            noUserid: true,
            ok:(res) => {
                this.setState({list: res.data});
            }
        });
    }
    render() {
        const Item = List.Item;
        const {list} = this.state;
        return (
            <div className='teamInfo'>
                {list&&<List>
                    <Item extra={(<img
                        className='infoImg'
                        src={window._imgHost + list.avatarUrl}
                        onError={(e) => {
                            e.target.src = './resource/images/wodemorenxxxhdpi.png';
                        }}
                    />)}>头像</Item>
                    {list.userName&&<Item extra={list.userName}>用户名</Item>}
                    {list.nickName&&<Item extra={list.nickName}>昵称名</Item>}
                    <WhiteSpace size="lg" style={{background: '#f4f4f4'}}/>
                    {list.sex == 0&&<Item extra={'保密'}>性别</Item>}
                    {list.sex == 1&&<Item extra={'男'}>性别</Item>}
                    {list.sex == 2&&<Item extra={'女'}>性别</Item>}
                    {list.birthday&&<Item extra={format.formatTime(new Date(list.birthday))}>出生日期</Item>}
                </List>}
                {!list&&<div className='teamBox'>
                    <div className='team_center'>
                        <img src="./resource/images/kongxxxhdpi.png"/>
                    </div>
                </div>}
            </div>
        );
    }
}