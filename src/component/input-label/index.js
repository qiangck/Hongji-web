'use strict';
import React,{Component} from 'react';
import { Flex, Radio, Modal  } from 'antd-mobile';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value||null
        }
    }
    componentDidMount () {}
    handleChange = (val) => {
        const {onChange,maxLength} = this.props;
        let value;
        if(maxLength && (val.target.value.length > maxLength)) {
            value = this.state.value;
        } else {
            value = val.target.value;
        }
        (typeof onChange == 'function')&&(onChange(value));
        this.setState({value});
    }
    render() {
        const {value} = this.state;
        const {placeholder,type,disabled} = this.props;
        return (
            <div className="input-label">
                <div className="label">{this.props.children}</div>
                <div className="input">
                    {type!='isText'&&<input
                        className="_inputItem"
                        onChange={this.handleChange}
                        type={type||'text'}
                        disabled={!!disabled}
                        value={this.props.value!=null?this.props.value:value}
                        placeholder={placeholder||''}
                    />}
                    {type=='isText'&&<div className="_text">{this.props.value||''}</div>}
                </div>
            </div>
        );
    }
}