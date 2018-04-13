'use strict';
import React,{Component} from 'react';
import _ from 'lodash';
import { Modal } from 'antd-mobile';
import { ManageItem } from 'comp'
import { openurl, request } from 'util';
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
        request.checkUserBank({
            data: {},
            ok: (res) => {
                this.setState({list:res.data})
            }
        })
    }
    addAddress = () => {
        const {list} = this.state;
        openurl('bankCardUpdata',{isDefault:list&&list.length>0?0:1});
    }
    editAddress = (item) => {
        openurl('bankCardUpdata',{item});
    }
    delAddress = (id,index) => {
        let {list} = this.state;
        alert('提示', '是否确定删除？', [
            { text: '取消' },
            { text: '确定', onPress: () => {
                request.deleteUserBank({
                    data: {id},
                    ok:(res) => {
                        if(list[index].isDefault == 1 && list.length > 1) {
                            list.splice(index,1);
                            let params = _.assign(list[0],{isDefault:1})
                            request.updateUserBank({
                                data: params,
                                ok: this.fetch
                            });
                            return false;
                        } else {
                            list.splice(index,1);
                        }
                        this.setState({list});
                    }
                })
            }},
        ]);
    }
    choiceItem = (item,cb) => {
        cb&&request.updateUserBank({
            data: item,
            ok: cb
        });
    }
    render() {
        return (
            <div className='user user_address'>
                <ManageItem
                    entry="bank"
                    list={this.state.list}
                    addText="添加银行卡"
                    addEvent={this.addAddress}
                    delEvent={({item, index})=>this.delAddress(item.id, index)}
                    editEvent={({item, index})=>this.editAddress(item)}
                    changeEvent={(item, cb)=>this.choiceItem(item,cb)}
                />
            </div>
        );
    }
}