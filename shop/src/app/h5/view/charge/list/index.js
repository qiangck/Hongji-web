'use strict';
import React,{Component} from 'react';
// import {findDOMNode} from 'react-dom';
import {GoodsItem} from 'comp';
import {request,openurl} from 'util';
import {PullToRefresh,ListView} from 'antd-mobile';
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
            noPayList: false,
            hasMore: true,
            page: 1,
            limit: 10,
            height: document.documentElement.clientHeight,
        };
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        // const hei = this.state.height - findDOMNode(this.lv).offsetTop;
        const {page,limit} = this.state;
        request.productList({
            data: {page, limit},
            ok: (result) => {
                this._data = result.data || [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    noPayList: this._data.length == 0,
                    // height: hei,
                    page: page + 1
                });
            }
        });
    }
    openurl = (param) => {
        _.assign(param,{title: '商品详情'})
        openurl.native('detail',param);
    }
    refresh() {
        const {isRefreshing} = this.state;
        request.productList({
            data: {
                page: 1, limit: 10
            },
            start: () => {
                this.setState({
                    isRefreshing: true
                })
            },
            ok: (result) => {
                this._data = result.data;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    noPayList: this._data.length == 0,
                    page: 2,
                    hasMore: true
                });
            },
            fail: (result) => {
                this.setState({noPayList: this._data.length == 0})
            },
            finish: () => {
                this.setState({
                    isRefreshing: false
                })
            }
        });
    }
    renderFooter = () =>{
        const {isLoading, noPayList} = this.state;
        let content = '';
        if (isLoading) {
            content = '加载中...';
        } else {
            if (noPayList) {
                return (
                    <div className='listBox'>
                        <img className='list_center' src="./resource/images/kongxxxhdpi.png"/>
                    </div>
                )
            }
        }
        return (
            <div>{content}</div>
        );
    }
    renderRow = (rowData) =>{
        let item = _.assign({},rowData);
        item['imgUrl'] = window._imgHost + item.imgUrl;
        return (<GoodsItem onClick={this.openurl.bind(this,item)} {...item}/>)
    }
    onEndReached = (event) => {
        if (!this.state.hasMore) return;
        const {limit,page} = this.state;
        this.setState({ isLoading: true, hasMore: false });
        request.productList({
            data: {page,limit,},
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
        const {dataSource, isRefreshing} = this.state;
        return (
            <ListView
                // ref={el => this.lv = el}
                style={{height: this.state.height}}
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
            />
        );
    }
}