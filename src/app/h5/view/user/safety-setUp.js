'use strict';
import React,{Component} from 'react';
import { List } from 'antd-mobile';
import { openurl } from 'util';
import './index.less';
const Item = List.Item;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount () {}
    render() {
        const state = this.props.location.state;
        const type = state?state.type:'safety';
        return (
            <div className='user'>
                <List>
                    <Item arrow="horizontal" onClick={() => openurl('setUpFeedback')}>功能反馈</Item>
                    <Item arrow="horizontal" onClick={() => openurl('setUpAbout')}>关于</Item>
                </List>
            </div>
        );
    }
}