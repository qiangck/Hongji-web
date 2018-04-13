'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import action from 'action';
import {FrameContainer} from 'comp';
import {param} from 'util';
@connect(
    (state)=> {
        return {history: state.charge.history}
    },
    (dispatch)=> {
        return {actions: bindActionCreators(action.charge.creator, dispatch)}
    }
)
export default class extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {actions:{push_history}}=this.props;
        const queryParam = param();
        this.routeSwitch(queryParam.entry)
    }
    routeSwitch(entry) {
        const {actions:{push_history}}=this.props;
        const queryParam = param();
        switch(entry) {
            case 'list':
                require.ensure(['./list'], function () {
                    let List = require('./list').default;
                    push_history(<List {...queryParam}/>);
                }, 'list');
                return false;
                break;
            case 'detail':
                require.ensure(['./detail'], function () {
                    let Detail = require('./detail').default;
                    push_history(<Detail {...queryParam}/>);
                }, 'detail');
                return false;
                break;
            case 'team':
                require.ensure(['./team'], function () {
                    let Team = require('./team').default;
                    push_history(<Team {...queryParam}/>);
                }, 'team');
                return false;
                break;
            case 'teamInfo':
                require.ensure(['./team/info'], function () {
                    let TeamInfo = require('./team/info').default;
                    push_history(<TeamInfo {...queryParam}/>);
                }, 'info');
                return false;
                break;
            case 'cart':
                require.ensure(['./cart'], function () {
                    let Cart = require('./cart').default;
                    push_history(<Cart {...queryParam}/>);
                }, 'cart');
                return false;
                break;
            case 'help':
                require.ensure(['./help'], function () {
                    let Help = require('./help').default;
                    push_history(<Help {...queryParam}/>);
                }, 'help');
                return false;
                break;
            case 'confirm':
                require.ensure(['./confirm'], function () {
                    let Confirm = require('./confirm').default;
                    push_history(<Confirm {...queryParam}/>);
                }, 'confirm');
                return false;
                break;
            case 'address':
                require.ensure(['./address'], function () {
                    let Address = require('./address').default;
                    push_history(<Address {...queryParam}/>);
                }, 'address');
                return false;
                break;
            case 'success':
                require.ensure(['./success'], function () {
                    let Success = require('./success').default;
                    push_history(<Success {...queryParam}/>);
                }, 'success');
                return false;
                break;
            default:
                require.ensure(['./list'], function () {
                    let List = require('./list').default;
                    push_history(<List {...queryParam}/>);
                }, 'list');
        }
    }

    render() {
        const {history}=this.props;
        return (
            <FrameContainer history={history}/>
        );
    }
}