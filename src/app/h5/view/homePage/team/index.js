'use strict';
import React,{Component} from 'react';
import {request, openurl, isObjectNull} from 'util';
import { Accordion,List,NoticeBar } from 'antd-mobile';
import '../index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {json:null,number:0,noticeList:null}
    }
    componentWillMount() {
        request.teamList({
            data: {},
            ok: (res) => {
                if(res.data&&res.data.teamList&&res.data.teamList.length) {
                    this.setState({
                        json:res.data.teamList[0],
                        number: res.data.number
                    });

                }
            }
        });
        request.getChildRechargeRecord({
            data: {},
            ok: (res) => {
                this.setState({noticeList:res.data});
            }
        });
    }
    accordionList = (item, status) =>{
        const {number} = this.state;
        if(item.childrenList.length <= 0) {
            return (
                <List>
                    <List.Item><img
                        className='lineImg'
                        onClick={(e) => {
                            e.stopPropagation();
                            item.userId&&openurl('teamInfo',{userId:item.userId});
                        }}
                        src={window._imgHost + item.avatarUrl}
                        onError={(e) => {
                            e.target.src = './resource/images/wodemorenxxxhdpi.png';
                        }}
                    />{item.userName}</List.Item>
                </List>
            )
        }
        return (
            <Accordion defaultActiveKey={status == 'first'?'0':null}>
                <Accordion.Panel
                    header={(
                        <div><img
                            className='lineImg'
                            onClick={(e) => {
                                e.stopPropagation();
                                item.userId&&openurl('teamInfo',{userId:item.userId});
                            }}
                            src={window._imgHost + item.avatarUrl}
                            onError={(e) => {
                                e.target.src = './resource/images/wodemorenxxxhdpi.png';
                            }}
                        />{status == 'first'?`${item.userName}(总人数:${number}人)`:item.userName}</div>
                    )}
                >
                    <List>
                        {item.childrenList.map(val => {
                            return (<List.Item>{this.accordionList(val)}</List.Item>)
                        })}
                    </List>
                </Accordion.Panel>
            </Accordion>
        )
    }
    render() {
        const {json,noticeList} = this.state;
        return (
            <div className='team'>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0' } }}>{noticeList&&!isObjectNull(noticeList)&&noticeList.join(' ')}</NoticeBar>
                {json&&this.accordionList(json, 'first')}
                {!json&&<div className='teamBox'>
                    <div className='team_center'>
                        <img src="./resource/images/kongxxxhdpi.png"/>
                    </div>
                </div>}
            </div>
        );
    }
}