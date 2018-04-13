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
        const {params} = this.props;
        return {
            dataSource: dataSource.cloneWithRows(this._data),
            isLoading: false,
            isRefreshing: false,
            hasMore: true,
            page: 1,
            limit: 10,
            height: document.documentElement.clientHeight - 45,
            queryDate: this.formatDate(new Date().getTime()),
            flowType: params&&params.id || 1,
            income: 0,
            pay: 0,
            noList: false
        };
    }

    componentDidMount() {
        this.fetch();
        this.getTransactionTotal();
    }
    getTransactionTotal = (date) => {
        const {flowType,queryDate} = this.state;
        request.getTransactionTotal({
            data:{queryDate:date||queryDate,flowType},
            ok:(res) => {
                const {tansactionNum2, tansactionNum1} = res.data;
                this.setState({income:tansactionNum2,pay:tansactionNum1});
            }
        })
    }
    fetch = (isRefresh, date) =>{
        const {limit,queryDate,flowType,isRefreshing} = this.state;
        this._data = [];
        let obj = {
            data: {queryDate:date||queryDate,flowType,page:1,limit},
            ok: (result) => {
                this._data = result.data || [];
                let statistics = this.statisticsData(this._data);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    page: 2,
                    hasMore: this._data.length >= limit,
                    queryDate:date || queryDate,
                    // income: statistics.income,
                    // pay: statistics.pay,
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
        request.getTransactionList(obj);
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
    // 统计数据
    statisticsData = (data) => {
        let obj = { income:0, pay:0 };
        data&&data.map(item => {
            if(item.tranNum > 0) {
                obj['income'] = obj.income + item.tranNum;
            }
            if(item.tranNum < 0) {
                obj['pay'] = obj.pay + item.tranNum;
            }
        });
        return obj;
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
        const {flowType} = this.state;
        return (
            <div className="detailList">
                <div className="_left _box">
                    {flowType==1&&<p>
                        {item.flowType==1&&'兑现'}
                        {item.flowType==4&&'奖励'}
                    </p>}
                    {flowType==2&&<p>
                        {item.flowType==1&&`卖出${item.incomeType==1?'(静态获得)':''}${item.incomeType==2?'(分享奖励)':''}`}
                        {item.flowType==2&&`收入${item.incomeType==1?'(静态获得)':''}${item.incomeType==2?'(分享奖励)':''}`}
                    </p>}
                    {flowType==3&&<p>
                        {item.flowType==1&&'换卡'}
                        {item.flowType==2&&'兑现'}
                        {item.flowType==3&&'奖励'}
                    </p>}
                    <p>
                        {item.soldStatus==-1&&`被驳回(${item.comments})`}
                        {item.soldStatus==0&&'未处理'}
                        {item.soldStatus==1&&'已到账'}
                    </p>
                </div>
                <div className="_right _box">
                    <p>{format.formatTime(new Date(item.createTime))}</p>
                    <p>{item.tranNum}</p>
                </div>
            </div>
        )
    }
    onEndReached = (event) => {
        if (!this.state.hasMore) return;
        const {queryDate,flowType,page,limit} = this.state;
        this.setState({ isLoading: true, hasMore: false });
        request.getTransactionList({
            data: {queryDate,flowType,page,limit},
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
        const {dataSource, isRefreshing, income ,pay ,noList} = this.state;
        return (
            <DatePicker onChange={date => {
                let time = this.formatDate(new Date(date).getTime());
                this.fetch(null, time);
                this.getTransactionTotal(time);
            }} income={income} pay={pay}>
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