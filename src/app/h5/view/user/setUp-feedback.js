'use strict';
import React,{Component} from 'react';
import { Button, Toast, TextareaItem  } from 'antd-mobile';
import { InputLabel } from 'comp';
import { request, reg, openurl } from 'util';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            mobile: null
        }
    }
    componentWillMount () {}
    handleSubmit = () => {
        const {content, mobile} = this.state;
        if((!content || !mobile)) {
            Toast.fail('请填写您的反馈内容及联系方式', 1);
            return false;
        }
        if(!reg.phone.test(mobile)) {
            Toast.fail('请输入正确的手机号', 1);
            return false;
        }
        request.feedback({
            data: {content,mobile},
            ok:(res) => {
                Toast.success('提交成功', 1, () => openurl('back'));
            }
        })
    }
    render() {
        return (
            <div className='user user_setUp_feedback'>
                <h2 className="title">问题描述</h2>
                <TextareaItem
                    rows={5}
                    count={100}
                    className="textarea"
                    onChange={val => this.setState({content:val})}
                />
                <InputLabel
                    type="number"
                    maxLength={11}
                    onChange={val => this.setState({mobile:val})}
                >手机号：</InputLabel>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >提交</Button>
            </div>
        );
    }
}