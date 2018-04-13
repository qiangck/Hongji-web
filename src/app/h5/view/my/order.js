'use strict';
import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DatePicker} from 'comp';
import {request,openurl,getUserInfo,format} from 'util';
import {PullToRefresh,Button,ListView,List,Toast} from 'antd-mobile';
import _ from 'lodash';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitState();
    }

    getInitState() {
        this._data = [];
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        return {
            dataSource: dataSource.cloneWithRows(this._data),
            isLoading: false,
            isRefreshing: false,
            hasMore: true,
            page: 1,
            limit: 10,
            noList: false,
            height: document.documentElement.clientHeight - 45
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = (isRefresh) =>{
        const {limit,isRefreshing} = this.state;
        const {params} = this.props;
        let obj = {
            data: {page:1,limit},
            ok: (result) => {
                this._data = result.data || [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    page: 2,
                    hasMore: this._data.length >= limit,
                    noList: this._data.length <= 0
                });
            }
        };
        if(isRefresh) obj = _.assign(obj,{
            start: () => {
                this.setState({
                    isRefreshing: true
                })
            },
            finish: () => {
                this.setState({
                    isRefreshing: false
                })
            }
        });
        if(params&&params.id==1) _.assign(obj.data, {status:params.id});
        request.orderList(obj);
    }
    // 格式化时间
    formatDate = (time) => {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return [year, month].map((n) => {
            n = n.toString();
            return n[1] ? n : '0' + n
        }).join('');
    }
    // 刷新
    refresh() {
        this.fetch(true);
    }
    renderFooter = () =>{
        const {isLoading} = this.state;
        return (<div>{isLoading&&'加载中...'}</div>);
    }
    confirmSubmit = (orderId) => {
        request.orderReceipt({
            data:{orderId},
            ok:this.fetch
        });
    }
    renderRow = (rowData) =>{
        let data = _.assign({},rowData);
        return (
            <div className="orderList">
                {data.products.length<=1&&<div className='cartBox'>
                    <div className='cartItem'>
                        <img className='cartImage' src={window._imgHost + data.products[0].imgUrl} onError={(e) => {
                            e.target.src = './resource/images/morenshangpin.png';
                        }}/>
                        <div className='content'>
                            <div className='line'>
                                <p className='name'>{data.products[0].name}</p>
                                <p className='num'>{data.integrationNum}</p>
                            </div>
                        </div>
                    </div>
                </div>}
                {data.products.length>1&&<div className='cartBox'>
                    <div className='cartItemList'>
                        {data.products.map(item => (
                            <img className='cartImageList' src={window._imgHost + item.imgUrl} onError={(e) => {
                                e.target.src = './resource/images/morenshangpin.png';
                            }}/>
                        ))}
                    </div>
                </div>}
                <div className='count'>
                    <div className='total'>
                        <p>共{data.products.length}件商品</p>
                        <a>合计:￥{data.integrationNum.toFixed(2)}</a>
                    </div>
                </div>
                {data.status == 1&&<div className='confirm'><a onClick={this.confirmSubmit.bind(this, data.id)}>确认收货</a></div>}
                {data.status == 2&&<div className='confirm'><a>已完成</a></div>}
            </div>
        )
    }
    onEndReached = (event) => {
        if (!this.state.hasMore) return;
        const {page,limit} = this.state;
        this.setState({ isLoading: true, hasMore: false });
        request.orderList({
            data: {page,limit},
            ok: (result) => {
                this._data = [...this._data, ...result.data || []];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    page: page + 1,
                    isLoading: false,
                    hasMore: result.data.length >= limit
                });
            }
        });
    };
    render() {
        const {dataSource, isRefreshing, noList} = this.state;
        return (
            <div>
                {!noList&&<ListView
                    ref={el => this.lv = el}
                    style={{height: this.state.height}}
                    className="order"
                    dataSource={dataSource}
                    renderFooter={this.renderFooter}
                    renderRow={this.renderRow}
                    pullToRefresh={
                        <PullToRefresh
                            refreshing={isRefreshing}
                            onRefresh={this.refresh.bind(this)}
                        />
                    }
                    onEndReached={this.onEndReached}
                />}
                {noList&&<div className='listBox'>
                    <img className='list_center' src="./resource/images/kongxxxhdpi.png"/>
                </div>}
            </div>
        );
    }
}