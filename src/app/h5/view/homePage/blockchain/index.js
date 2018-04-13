'use strict';
import React,{Component} from 'react';
import { List, Button, Toast  } from 'antd-mobile';
import { setUserInfo, getUserInfo } from 'util';
import '../index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	gsc_num: null,
        	hold_gsc_num: null
        }
    }
    componentWillMount() {
        setUserInfo(()=>{
            getUserInfo((userinfo) => {;
                this.setState({
                    hold_gsc_num: userinfo.hold_gsc_num,
                    gsc_num: userinfo.gsc_num
                });
            });
        });
    }
    render() {
    	const {hold_gsc_num,gsc_num} = this.state;
        return (
            <div className='blockchain'>
            	<div className="line">
            		<span className="_item">资产</span>
            		<span className="_item">数量</span>
            		<span className="_item">单位</span>
            	</div>
            	<div className="line">
            		<span className="_item">总资产</span>
            		<span className="_item">{hold_gsc_num||0}</span>
            		<span className="_item">GSC</span>
            	</div>
            	<div className="line">
            		<span className="_item">分红完成</span>
            		<span className="_item">{gsc_num||0}</span>
            		<span className="_item">GSC<img src="./resource/images/icon_up.png"/></span>
            	</div>
            </div>
        );
    }
}