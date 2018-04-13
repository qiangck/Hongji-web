'use strict';
import React,{Component} from 'react';
import {hashHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import action from 'action';
import {connect} from 'react-redux';
import { Button, Toast } from 'antd-mobile';
import { request, openurl } from 'util';
import '../index.less';
@connect(
    (state) => {
        return {
            file: state.fileUpload.file
        }
    },
    (dispatch) => {return{
        saveFile:bindActionCreators(action.fileUpload.creator.file,dispatch)
    }}
)
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileDom: null
        }
    }
    handleSubmit = () => {
        const {file, fileDom} = this.state;
        if(!file) {
            Toast.fail('请选择图片', 1);
            return false;
        }
        this.props.saveFile(file);
        openurl('back');
    }
    render() {
        const {fileDom} = this.state;
        return (
            <div className='shopping-voucher'>
                <div className="upload">
                    {!fileDom&&<img className="_icon" src='./resource/images/icon-shangchuan.png'/>}
                    {!fileDom&&<p>点击上传图片</p>}
                    {fileDom&&<img className="fileImage" src={fileDom}/>}
                    <input
                        type="file"
                        name="file"
                        accept="image/jpg,image/jpeg,image/png"
                        onChange={(e) => {
                            var file = e.target.files;
                            var reader = new FileReader();
                            reader.onload = (evt) => {
                                this.setState({file:file[0], fileDom:evt.target.result});
                            }
                            file.length>0&&reader.readAsDataURL(file[0]);
                        }}
                    />
                </div>
                <Button
                    type="primary"
                    className="button"
                    onClick={this.handleSubmit}
                >上传图片</Button>
                <div className="up-remarks">
                    <p>注:点击上传图片后即可返回上层页面提交订单</p>
                </div>
            </div>
        );
    }
}