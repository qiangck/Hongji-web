'use strict';
import React,{Component} from 'react';
import {hashHistory} from 'react-router';
import { NavBar, Icon } from 'antd-mobile';
import { config, openurl } from 'util';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {pathname} = this.props.location;
        let pathList = config.pathList.filter(item => item.path == pathname.split('/')[2]);
        let params = this.props.params.id;
        let title = pathList.length>0&&pathList[params&&params-1||0];
        let rightContent = title&&title.rightContent;
        return (
            <div className='entry'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" style={{
                        width: '30px',
                        height: '30px',
                        color: '#333'
                    }}/>}
                    className="navBar"
                    onLeftClick={() => hashHistory.goBack()}
                    rightContent={[rightContent&&<a onClick={()=>openurl(rightContent.path)}>{rightContent.name}</a>]}
                >{title&&title.name}</NavBar>
                {this.props.children}
            </div>
        );
    }
}