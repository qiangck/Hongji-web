'use strict';
import React,{Component} from 'react';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount () {}
    render() {
        return (
            <div className='user user_setUp_about'>
                <p className="title">泓济智能科技</p>
                <img className="logo" src="./resource/images/img-logoxxxhdpi.png"/>
                <p className="version">版本号：version 1.1</p>
                <div className="footer">
                    <p>Copyright@2014-2017</p>
                    <p>泓济智能科技有限公司版权所有</p>
                </div>
            </div>
        );
    }
}