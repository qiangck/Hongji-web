'use strict';
import React,{Component} from 'react';
import {DatePickerUp} from 'comp';
import {request,format,isObjectNull} from 'util';
import {PullToRefresh,Button,ListView,List,Toast,WhiteSpace} from 'antd-mobile';
import '../index.less';
const Item = List.Item;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = this.state = this.getInitState();
    }
    getInitState() {
        this._data = [];
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        return {
            dataSource: dataSource.cloneWithRows(this._data),
            isRefreshing: false,
            height: document.documentElement.clientHeight - 45,
            startTime: new Date().getTime(),
            endTime: new Date().getTime(),
            noList: false,
            list: null
        };
    }
    componentDidMount() {
        const {userId} = this.props.location.state;
        request.teamInfo({
            data: {userId},
            noUserid: true,
            ok:(res) => {
                this.setState({list: res.data});
                this.setState({height: document.documentElement.clientHeight-document.getElementById('listDom').clientHeight-70});
            }
        });
        this.fetch();
    }

    fetch = (isRefresh, dateStart, dateEnd) =>{
        const {userId} = this.props.location.state;
        const {startTime,endTime,isRefreshing} = this.state;
        this._data = [];
        let obj = {
            data: {
                startTime:dateStart || startTime,
                endTime:dateEnd || endTime,
                userId
            },
            noUserid: true,
            ok: (result) => {
                this._data = result.data || [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    startTime:dateStart || startTime,
                    endTime:dateEnd || endTime,
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
        request.listByTime(obj);
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
                <div className="_left _box">
                    <p>{format.formatTime(new Date(item.rechargeTime))}</p>
                </div>
                <div className="_right _box">
                    {item.money&&<p>{item.money}元</p>}
                </div>
            </div>
        )
    }
    roleRender = (role) => {
        switch(role) {
            case 0:
                return (<Item extra="会员">级别</Item>);
            case 1:
                return (<Item extra="初级微股东">级别</Item>);
            case 2:
                return (<Item extra="中级微股东">级别</Item>);
            case 3:
                return (<Item extra="高级微股东">级别</Item>);
            default: return null
        }
    }
    render() {
        const {list,dataSource, isRefreshing, income ,pay ,noList} = this.state;
        return (
            <div className='teamInfo'>
                {list&&<List id="listDom">
                    {list.userName&&<Item extra={list.userName}>用户名</Item>}
                    {list.nickName&&<Item extra={list.nickName}>昵称名</Item>}
                    <WhiteSpace size="lg" style={{background: '#f4f4f4'}}/>
                    {list.birthday&&<Item extra={format.formatTime(new Date(list.birthday))}>出生日期</Item>}
                    {this.roleRender(list.roleType)}
                </List>}
                <DatePickerUp onChange={date => {
                    this.fetch(null, date.startTime.getTime(), date.endTime.getTime());
                }} income={income} pay={pay}>
                    {!noList&&<ListView
                        ref={el => this.lv = el}
                        style={{height: this.state.height}}
                        className="detail"
                        dataSource={dataSource}
                        renderRow={this.renderRow}
                        pullToRefresh={
                            <PullToRefresh
                                refreshing={isRefreshing}
                                onRefresh={this.refresh.bind(this)}
                            />
                        }
                    />}
                    {noList&&<div className='listBox'>
                        <img className='list_center' src="./resource/images/kongxxxhdpi.png"/>
                    </div>}
                </DatePickerUp>
                {!list&&<div className='teamBox'>
                    <div className='team_center'>
                        <img src="./resource/images/kongxxxhdpi.png"/>
                    </div>
                </div>}
            </div>
        );
    }
}