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
        return (
            <div className='user'>
                <List>
                    <Item arrow="horizontal" onClick={() => openurl('safetyLogin')}>修改登录密码</Item>
                    <Item arrow="horizontal" onClick={() => openurl('safetyTransaction')}>修改交易密码</Item>
                </List>
            </div>
        );
    }
}