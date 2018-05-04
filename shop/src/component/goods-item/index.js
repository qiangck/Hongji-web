'use strict';
import React,{Component} from 'react';
import './index.less';

export default class GoodsItem extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    handleClick = () => {
        const {onClick} = this.props;
        (typeof onClick=='function')&&onClick(this.props);
    }
    render(){
        const {imgUrl,name,description,price} = this.props;
        return (
            <div className='goodsItem' onClick={this.handleClick}>
                <div className='goodsItem_pic'>
                    {imgUrl&&<img src={imgUrl} onError={(e) => {
                        e.target.src = './resource/images/morenshangpin.png';
                    }}/>}
                </div>
                <div className='goodsItem_info'>
                    {name&&<div className='goodsItem_title'>{name}</div>}
                    {description&&<div className='goodsItem_subtitle'>{description}</div>}
                    {price&&<div className='goodsItem_price'>{price}￥</div>}
                </div>
            </div>
        );
    }
}