'use strict';
import React,{Component} from 'react';
import { Button } from 'antd-mobile';
import {hashHistory} from 'react-router';
import {openurl} from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {}
    render() {
    	const {list} = this.state;
        return (
            <div className='shop_success'>
                <div className='successBox'>
                    <div className='success_center'>
                        <img src="./resource/images/chenggongxxhdpi.png"/>
                        <div className='success_text'>订单交易成功!</div>
                    </div>
                </div>
                <div className='successBtn'>
                    <Button type="warning" onClick={()=>{
                        localStorage.removeItem("cart");
                        localStorage.removeItem("cartRevise");
                        openurl('$');
                    }}>返回首页</Button>
                </div>
            </div>
        );
    }
}