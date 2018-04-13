'use strict';
//库/框架
import React,{Component} from 'react';
import {connect} from 'react-redux';
//组件
import {ActivityIndicator} from 'antd-mobile';

@connect(
    (state)=>{return {v:state.loading.view_state}},
)
export default class Loading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {v:{open}}=this.props;
        return (
            <ActivityIndicator
                toast
                text="加载中"
                animating={open}
                color="white"
                size="large"
            />
        );
    }
}