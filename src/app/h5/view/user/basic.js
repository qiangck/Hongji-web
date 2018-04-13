'use strict';
import React,{Component} from 'react';
import $ from 'jquery';
import _ from 'lodash';
import { List, WhiteSpace, Button, Modal, Toast, Picker, DatePicker } from 'antd-mobile';
import { getUserInfo, setUserInfo, request, openurl } from 'util';
import { DefatulFace } from 'comp';
import './index.less';
const Item = List.Item;
const Prompt = Modal.prompt;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null,
            sex: null,
            nickName: null,
            idCard: null,
            birthdayStr: null,
            file: null
        };
    }
    componentDidMount () {
        getUserInfo((userinfo) => {
            this.setState({
                userName: userinfo.userName,
                avatarUrl: userinfo.avatarUrl,
                idCard: userinfo.idCard,
                nickName: userinfo.nickName,
                sex: [userinfo.sex],
                birthdayStr: this.formatBirthday(userinfo.birthday)
            });
        });
    }
    formatBirthday(time) {
        if(time<=0) {
            return new Date('1980-01-01');
        } else {
            return new Date(time);
        }
    }
    formatDate = (time) => {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return [year, month, day].map((n) => {
            n = n.toString();
            return n[1] ? n : '0' + n
        }).join('-');
    }
    handleSubmit = () => {
        const {userName,nickName,sex,birthdayStr,avatarUrl,idCard,file} = this.state;
        let formData = new FormData();
        let queryData = {};
        let param = {
            queryData:null,
            ok:(res) => {
                setUserInfo(() => openurl('back'));
            }
        };
        file&&formData.append("file", file[0]);
        _.assign(param, {queryData:{nickName,idCard,sex:sex[0],birthdayStr:this.formatDate(birthdayStr)}});
        file&&_.assign(param, {data:formData});
        request.updateFace(param);
    }
    render() {
        const {userName,nickName,sex,birthdayStr,avatarUrl} = this.state;
        return (
            <div className='user user_basic'>
                <List>
                    <Item extra={
                        <div className="userForm">
                            <input
                                type="file"
                                name="file"
                                accept="image/jpg,image/jpeg,image/png"
                                onChange={(e) => {
                                    var file = e.target.files;
                                    var reader = new FileReader();
                                    reader.onload = (evt) => {
                                        this.setState({file, avatarUrl: evt.target.result});
                                    }
                                    reader.readAsDataURL(file[0]);
                                }}
                            />
                            <DefatulFace className="_face" url={avatarUrl}/>
                        </div>
                    } arrow="horizontal" onClick={() => {}}>头像</Item>
                    <Item extra={userName||'暂无'}>用户名</Item>
                    <Item extra={this.state.nickName||'暂无'} arrow="horizontal" onClick={() => {
                        Prompt('修改姓名', '姓名由中文英文、数字、下划线组成',[{text: '取消'}, {
                            text: '确定',
                            onPress: nickName => new Promise((resolve) => {
                                let length = nickName.length;
                                let reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
                                if(!nickName) {
                                    Toast.info('姓名不能为空', 1);
                                    return false;
                                }
                                if(!reg.test(nickName)||length>10) {
                                    Toast.info('请输入正确的姓名', 1);
                                    return false;
                                }
                                this.setState({nickName});
                                resolve();
                            })
                        }],'',this.state.nickName)
                    }}>姓名</Item>
                    <Item extra={this.state.idCard||'暂无'} arrow="horizontal" onClick={() => {
                        Prompt('修改身份证', '',[{text: '取消'}, {
                            text: '确定',
                            onPress: idCard => new Promise((resolve) => {
                                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                                if(!idCard) {
                                    Toast.info('身份证号不能为空', 1);
                                    return false;
                                }
                                if(!reg.test(idCard)) {
                                    Toast.info('请输入正确的身份证号', 1);
                                    return false;
                                }
                                this.setState({idCard});
                                resolve();
                            })
                        }],'',this.state.idCard)
                    }}>身份证</Item>
                </List>
                <WhiteSpace size="md" />
                <List>
                    <Picker
                        data={[{
                            label: '保密',
                            value: 0
                        }, {
                            label: '男',
                            value: 1
                        }, {
                            label: '女',
                            value: 2
                        }]}
                        value={this.state.sex}
                        cols={1}
                        onOk={v => this.setState({sex:v})}
                    >
                        <Item arrow="horizontal">性别</Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        title="出生日期"
                        minDate={new Date('1980-01-01')}
                        maxDate={new Date()}
                        value={this.state.birthdayStr}
                        onChange={birthdayStr => this.setState({ birthdayStr })}
                    >
                        <List.Item arrow="horizontal">出生日期</List.Item>
                    </DatePicker>
                </List>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >确定</Button>
            </div>
        );
    }
}