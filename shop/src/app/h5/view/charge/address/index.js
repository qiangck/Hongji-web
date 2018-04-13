'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {request} from 'util';
import action from 'action';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import { Checkbox, Modal, Radio } from 'antd-mobile';
import Updata from './updata';
import './index.less';
const alert = Modal.alert;
@connect(
    null,
    (dispatch)=>{return {actions:bindActionCreators(action.charge.creator,dispatch)}}
)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	list: []
        }
    }
    componentWillMount() {
        this.fetch();
    }
    fetch = () => {
        request.userAddressList({
            data: {},
            ok: (res) => {
                this.setState({list:res.data})
            }
        })
    }
    updataAddress = (key,item) => {
        const {actions:{push_history}}=this.props;
        const {list} = this.state;
        if(key == 'edit') {
        	push_history(<Updata list={list} param={item}/>);
        } else {
        	push_history(<Updata list={list}/>);
        }
    }
    delAddress = (id,index) => {
        const {actions:{push_history}}=this.props;
    	let {list} = this.state;
		alert('提示', '是否确定删除？', [
			{ text: '取消' },
			{ text: '确定', onPress: () => {
		    	request.userAddressDelete({
		    		data: {id},
		    		ok:(res) => {
                        if(list[index].isDefault == 1 && list.length > 1) {
                            let params = _.assign(list[0],{isDefault:1})
                            request.userAddressSave({
                                data: params,
                                ok: (res) => {
                                    this.fetch();
                                }
                            });
                            return false;
                        }
		    			list.splice(index,1);
                        if(list.length <= 0) {
                            push_history(<Updata/>);
                            return false;
                        }
		    			this.setState({list});
		    		}
		    	})
			}},
		]);
    }
    choiceItem = (param,index) => {
        const {actions:{pop_history}} = this.props;
        const {list} = this.state;
        _.assign(param, {isDefault:1});
        list&&list.map((val,i) => val['isDefault'] = (i == index)?1:0);
        request.userAddressSave({
            data: param,
            ok: (res) => {
                this.setState({list});
                window.location.reload(true);
            }
        });
    }
    render() {
    	const {list} = this.state;
        return (
            <div className='cartAddress'>
            	<div className='addressList'>
            		{list&&list.map((item, index) => {
            			return (
			                <div className='addressItem'>
			                	<div className='addressBox'>
				                    <ul className='address_content'>
				                        <li>
				                            <strong className='name'>收货人：{item.name}</strong>
				                            <strong className='phone'>{item.mobile}</strong>
				                        </li>
				                        <li>收货地址：{item.userAddress}</li>
				                    </ul>
			                    </div>
			                    <div className='address_btn'>
			                    	<div className='default'>
			                    		<Checkbox onChange={this.choiceItem.bind(this,item,index)} checked={item.isDefault}/><span>设为默认</span>
			                    	</div>
			                    	<div className='control'>
			                    		<a className='edit' onClick={this.updataAddress.bind(this,'edit',item)}><img src='./resource/images/binajixxxhdpi.png'/><span>编辑</span></a>
			                    		<a className='del' onClick={this.delAddress.bind(this,item.id,index)}><img src='./resource/images/shanchuxxxhdpi.png'/><span>删除</span></a>
			                    	</div>
			                    </div>
			                </div>
            			)
            		})}
                </div>
                <div className='addressAdd' onClick={this.updataAddress.bind(this,'add')}>
                	<img src="./resource/images/tianjiaxxxhdpi.png"/><span>添加新地址</span>
                </div>
            </div>
        );
    }
}