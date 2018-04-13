'use strict';
import React,{Component} from 'react';
import {request, openurl} from 'util';
import { Accordion,List } from 'antd-mobile';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {json:null}
    }
    componentWillMount() {
        request.teamList({
            data: {},
            ok: (res) => {
                if(res.data.length > 0) {
                    this.setState({json:res.data[0]});
                }
            }
        });
    }
    accordionList = (item, status) =>{
        if(item.childrenList.length <= 0) {
            return (
                <List>
                    <List.Item><img
                        className='lineImg'
                        onClick={(e) => {
                            e.stopPropagation();
                            item.userId&&openurl.native('teamInfo',{userId:item.userId,title:'个人信息'});
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
                                item.userId&&openurl.native('teamInfo',{userId:item.userId,title:'个人信息'});
                            }}
                            src={window._imgHost + item.avatarUrl}
                            onError={(e) => {
                                e.target.src = './resource/images/wodemorenxxxhdpi.png';
                            }}
                        />{item.userName}</div>
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
        const {json} = this.state;
        return (
            <div className='team'>
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