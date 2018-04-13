'use strict';
//未登录下头像
import React,{Component} from 'react';
import './index.less';
export default class extends Component {
    render() {
        let {url} = this.props;
        let defaultUrl = './resource/images/img_morentouxiaing.png';
        if(!url) {
        	url = defaultUrl;
        } else {
        	if(url.indexOf('data:image')==-1) {
	        	url = `${window._imgHost}${url}`;
	        }
        }
        return (
            <img {...this.props} src={url} onError={v => v.target.src = defaultUrl}/>
        );
    }
}