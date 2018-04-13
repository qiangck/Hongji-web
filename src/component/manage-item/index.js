'use strict';
//地址管理
import React,{Component} from 'react';
import { Checkbox } from 'antd-mobile';
import _ from 'lodash';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }
    componentWillMount() {}
    shouldComponentUpdate(nextProps, nextState) {
        this.state.list = nextProps.list;
        return true;
    }
    _clickEvent = (name,item,index) => {
        let event = this.props[`${name}Event`];
        let param = name != 'add'?{item,index}:item;
        (typeof event == 'function')&&(event(param));
    }
    _handleCheckBox = (item, index) => {
        const {changeEvent} = this.props;
        if(typeof changeEvent != 'function') return;
        if(item.isDefault) {
            changeEvent(item);
            return;
        }
        changeEvent(_.assign(item,{isDefault:1}),()=>{
            this.state.list.map((val,i) => val['isDefault'] = (i == index)?1:0);
            this.forceUpdate();
        });
    }
    render() {
        const {list} = this.state;
        const {addText,entry='address'} = this.props;
        return (
            <div className="manage-item">
                <div className='addressList'>
                    {list&&list.map((item, index) => (
                        <div className='addressItem'>
                            <div className='addressBox'>
                                {entry=='address'&&<ul className='address_content'>
                                    <li>
                                        <strong className='name'>收货人：{item.name}</strong>
                                        <strong className='phone'>{item.mobile}</strong>
                                    </li>
                                    <li>收货地址：{item.userAddress}</li>
                                </ul>}
                                {entry=='bank'&&<ul className='address_content'>
                                    <li>
                                        {item.bankName&&<strong className='name'>{item.bankName}</strong>}
                                        {item.bankNum&&<strong className='phone'>{item.bankNum}</strong>}
                                    </li>
                                </ul>}
                            </div>
                            <div className='address_btn'>
                                <div className='default'>
                                    <Checkbox onChange={this._handleCheckBox.bind(this,item,index)} checked={item.isDefault}/><span>设为默认</span>
                                </div>
                                <div className='control'>
                                    <a className='edit' onClick={this._clickEvent.bind(this,'edit',item,index)}>
                                        <img src='./resource/images/binajixxxhdpi.png'/><span>编辑</span>
                                    </a>
                                    <a className='del' onClick={this._clickEvent.bind(this,'del',item,index)}>
                                        <img src='./resource/images/shanchuxxxhdpi.png'/><span>删除</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='addressAdd' onClick={this._clickEvent.bind(this,'add')}>
                    <img src="./resource/images/tianjiaxxxhdpi.png"/><span>{addText||'添加新地址'}</span>
                </div>
            </div>
        );
    }
}