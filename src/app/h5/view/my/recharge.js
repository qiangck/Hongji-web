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
        const {state} = this.props.location;
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
        request.rechargeList(obj);
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
    renderRow = (rowData) =>{
        let item = _.assign({},rowData);
        return (
            <div className="detailList">
                <div className="_left _box _recharge">
                    {item.review==0&&<p>未审核</p>}
                    {(item.review==1||item.review==2)&&<p>已奖励</p>}
                    {item.review==-1&&<p>{`被驳回:${item.comments}`}</p>}
                    <p>{item.money.toFixed(1)}</p>
                </div>
                <div className="_right _box _recharge">
                    <p>{format.formatTime(new Date(item.createTime))}</p>
                </div>
            </div>
        )
    }
    onEndReached = (event) => {
        if (!this.state.hasMore) return;
        const {page,limit} = this.state;
        this.setState({ isLoading: true, hasMore: false });
        request.rechargeList({
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
                    className="detail"
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