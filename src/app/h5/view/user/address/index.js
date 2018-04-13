'use strict';
import React,{Component} from 'react';
import {request, openurl} from 'util';
import _ from 'lodash';
import { Modal, List, InputItem, TextareaItem, Switch,Button, Toast } from 'antd-mobile';
import { ManageItem } from 'comp'
import '../index.less';
const alert = Modal.alert;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
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
    addAddress = () => {
        const {list} = this.state;
        openurl('addressUpdata', {list});
    }
    editAddress = (item) => {
        const {list} = this.state;
        openurl('addressUpdata', {list,param:item});
    }
    delAddress = (id,index) => {
        let {list} = this.state;
        alert('提示', '是否确定删除？', [
            { text: '取消' },
            { text: '确定', onPress: () => {
                request.userAddressDelete({
                    data: {id},
                    ok:(res) => {
                        if(list[index].isDefault == 1 && list.length > 1) {
                            list.splice(index,1);
                            let params = _.assign(list[0],{isDefault:1})
                            request.userAddressSave({
                                data: params,
                                ok: this.fetch
                            });
                            return false;
                        }
                        list.splice(index,1);
                        if(list.length <= 0) {
                            this.addAddress();
                            return false;
                        }
                        this.setState({list});
                    }
                })
            }},
        ]);
    }
    choiceItem = (item,cb) => {
        request.userAddressSave({
            data: item,
            ok: cb
        });
    }
    render() {
        return (
            <div className='user user_address'>
                <ManageItem
                    entry="address"
                    addText="添加新地址"
                    list={this.state.list}
                    addEvent={this.addAddress}
                    delEvent={({item, index})=>this.delAddress(item.id, index)}
                    editEvent={({item, index})=>this.editAddress(item)}
                    changeEvent={(item, cb)=>this.choiceItem(item,cb)}
                />
            </div>
        );
    }
}

