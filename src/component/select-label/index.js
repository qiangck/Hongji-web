'use strict';
import React,{Component} from 'react';
import { Flex, Radio, Modal  } from 'antd-mobile';
import { isObjectNull } from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: null,
            key: null,
            isShow: false
        }
    }
    componentWillReceiveProps(nextProps) {
        const {value,list,onChange} = nextProps;
        if(value!=null&&list!=null) {
            let stateObj = {};
            list.map((item, index) => {
                if(item.value == value) stateObj = {activeItem: item,key: index};
            });
            if(isObjectNull(stateObj)) {
                (typeof onChange == 'function')&&(onChange(null));
                this.setState({activeItem:null});
            }
        }
    }
    handleChange = (key, e) => {
        e.stopPropagation();
        this.setState({key});
    }
    handleClose = () => {
        const {list,onChange} = this.props;
        const {key} = this.state;
        const activeItem = key!=null?list[key]:null;
        (typeof onChange == 'function')&&(onChange(activeItem&&activeItem.value));
        this.setState({isShow:false,activeItem});
    }
    render() {
        const {list, placeholder="", value, showValue, title, children, showDefault} = this.props;
        const { key, activeItem } = this.state;
        return (
            <div className="select-label">
                {children&&<div className="label">{children}</div>}
                <div className="select" style={{paddingLeft: children?'100px':'12px'}}>
                    <div className="_inputItem _select" onClick={()=>this.setState({isShow:true})}>
                        <img src="./resource/images/arrow_red_down.png"/>
                        {placeholder&&activeItem==null&&showDefault==null&&<span className="_placeholder">{placeholder}</span>}
                        {activeItem!=null&&showDefault==null&&<span>{showValue||activeItem.label}</span>}
                        {showDefault!=null&&<span>{showDefault}</span>}
                    </div>
                </div>
                <Modal
                    visible={this.state.isShow}
                    transparent
                    maskClosable={false}
                    title={title}
                    footer={[{ text: '确定', onPress: this.handleClose}]}
                >
                    <div className="_modal">
                        {list&&list.map((item, index) => {
                            return (
                                <div className="_modalItem">
                                    <Radio
                                        className="_radio"
                                        key={item.value}
                                        checked={key === index}
                                        onChange={this.handleChange.bind(this, index)}
                                    >{item.label}</Radio>
                                </div>
                            )
                        })}
                    </div>
                </Modal>
            </div>
        );
    }
}