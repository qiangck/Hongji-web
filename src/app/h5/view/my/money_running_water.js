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
            height: document.documentElement.clientHeight - 45,
            queryDate: this.formatDate(new Date().getTime()),
            shouru: 0,
            zhichu: 0,
            noList: false
        };
    }

    componentDidMount() {
        this.fetch();
        this.flowFetch();
    }

    flowFetch = (date) => {
        const {queryDate} = this.state;
        request.findGscFlow({
            data: {queryDate:date||queryDate},
            ok:(res)=> {
                if(!res.data||res.data.length<0) return false;
                this.setState({
                    zhichu: res.data[0].zhichu || 0,
                    shouru: res.data[0].shouru || 0
                });
            }
        })
    }

    fetch = (isRefresh, date) =>{
        const {queryDate,page,limit,userId,zhichu,shouru} = this.state;
        this._data = [];
        let obj = {
            data: {createTime:date||queryDate,page:1,limit},
            ok: (result) => {
                this._data = result.data || [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    page: 2,
                    hasMore: this._data.length >= limit,
                    queryDate:date || queryDate,
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
        request.gscFlowList(obj);
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
        let {flowType, amount, monyAddren, createTime} = item;
        return (
            <div className="detailList">
                <div className="_left _box">
                    <p>
                        {flowType==1&&`转出`}
                        {flowType==2&&`收入`}
                        <p>{format.formatTime(new Date(createTime))}</p>
                    </p>
                </div>
                <div className="_right _box">
                    <p>
                        <p>{monyAddren}</p>
                        <p>{amount}</p>
                    </p>
                </div>
            </div>
        )
    }
    onEndReached = (event) => {
        if (!this.state.hasMore) return;
        const {queryDate,flowType,page,limit} = this.state;
        this.setState({ isLoading: true, hasMore: false });
        request.gscFlowList({
            data: {createTime:queryDate,flowType,page,limit,zhichu,shouru},
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
        const {dataSource, isRefreshing, shouru ,zhichu ,noList} = this.state;
        return (
            <DatePicker onChange={date => {
                let time = this.formatDate(new Date(date).getTime());
                this.fetch(null, time);
                this.flowFetch(time);
            }} income={shouru} incomeText="转入" pay={zhichu} payText="转出">
                {!noList&&<ListView
                    ref={el => this.lv = el}
                    style={{height: this.state.height}}
                    className="detail"
                    dataSource={dataSource}
                    renderFooter={this.renderFooter}
                    renderRow={this.renderRow}
                    contentContainerStyle={{paddingBottom:'44px'}}
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
            </DatePicker>
        );
    }
}