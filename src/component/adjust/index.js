'use strict';
//库/框架
//商品页面商品数量的增加和减少
import React,{Component} from 'react';
import {ImeComponent} from 'ime-react';
import {Provider,connect,Connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import action from 'action';
import store from 'store';
import './index.less';

export default class Adjust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: (props.value > props.max)?props.max:props.value || props.min || 1
        }
    }
    _contrast(num) {
        let [_min,_max] = [1,999];
        const {min,max} = this.props;
        if(typeof num != 'number') return false;
        _min = (min&&min>=_min)?min:_min;
        _max = (max&&max<=_max)?max:_max;
        if(num >= _min && num <= _max) return true;
        return false;
    }
    handleClick = (bool) => {
        let _max = 999;
        let {num} = this.state;
        const {onChange} = this.props;
        num = bool?num+1:num-1;
        if(!this._contrast(num)) return;
        this.setState({num});
        (typeof onChange=='function')&&onChange(num);
    }
    // handleChange = (e) => {
    //     let value = e.target.value;
    //     if((/^[0-9]*[1-9][0-9]*$/.test(value)&&this._contrast(parseInt(value, 10))) || value == '') {
    //         this.setState({num:value});
    //     }
    // }
    render() {
        const {num} = this.state;
        return (
            <div className='adjust'>
                <a className='adjust_decrease' onClick={this.handleClick.bind(this, false)}>-</a>
                <input className='adjust_quantity' value={num} onChange={this.handleChange} disabled/>
                <a className='adjust_increase' onClick={this.handleClick.bind(this, true)}>+</a>
            </div>
        )
    }
}