'use strict';
//收支页面
import React,{Component} from 'react';
import { DatePicker } from 'antd-mobile';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }
    render() {
        const {date} = this.state;
        return (
            <div className='date-picker'>
                <div className="row shadow">
                    <DatePicker
                        mode="month"
                        title="选择日期"
                        minDate={new Date('2000-1')}
                        maxDate={new Date()}
                        value={this.state.date}
                        onChange={date => {
                            const {onChange} = this.props;
                            (typeof onChange == 'function')&&(onChange(date));
                            this.setState({ date });
                        }}
                    >
                        <div className="col col-4 date">
                            <p>{date.getFullYear()}年</p>
                            <p>{date.getMonth()+1}月<img src="./resource/images/icon-xiala.png"/></p>
                        </div>
                    </DatePicker>
                    <div className="col col-20 info">
                        <div className="row">
                            <div className="col col-12 center">
                                <p className="title">{this.props.payText || '支出'}</p>
                                <p>{this.props.pay || 0}</p>
                            </div>
                            <div className="col col-12 center">
                                <p className="title">{this.props.incomeText || '收入'}</p>
                                <p>{this.props.income || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}