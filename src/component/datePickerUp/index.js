'use strict';
import React,{Component} from 'react';
import { DatePicker } from 'antd-mobile';
import './index.less';
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: new Date(),
            startTimeMix: new Date(),
            endTime: new Date(),
            endTimeMin: new Date()
        }
    }
    render() {
        const {startTime,endTime,startTimeMix,endTimeMin} = this.state;
        return (
            <div className='date-picker'>
                <div className="row shadow">
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        minDate={new Date('2000-1')}
                        maxDate={startTimeMix}
                        value={this.state.startTime}
                        onChange={startTime => {
                            const {onChange} = this.props;
                            (typeof onChange == 'function')&&(onChange(Object.assign({},this.state,{startTime})));
                            this.setState({ startTime, startTimeMix:endTime, endTimeMin: startTime});
                        }}
                    >
                        <div className="col col-12 date">
                            <div>初始时间</div>
                            <div>
                                <span>{startTime.getFullYear()}年</span>
                                <span>{startTime.getMonth()+1}月</span>
                                <span>{startTime.getDate()}日<img src="./resource/images/icon-xiala.png"/></span>
                            </div>
                        </div>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="选择日期"
                        minDate={endTimeMin}
                        maxDate={new Date()}
                        value={this.state.endTime}
                        onChange={endTime => {
                            const {onChange} = this.props;
                            (typeof onChange == 'function')&&(onChange(Object.assign({},this.state,{endTime})));
                            this.setState({ endTime, startTimeMix:endTime });
                        }}
                    >
                        <div className="col col-12 date">
                            <div>结束时间</div>
                            <div>
                                <span>{endTime.getFullYear()}年</span>
                                <span>{endTime.getMonth()+1}月</span>
                                <span>{endTime.getDate()}日<img src="./resource/images/icon-xiala.png"/></span>
                            </div>
                        </div>
                    </DatePicker>
                </div>
                {this.props.children}
            </div>
        );
    }
}