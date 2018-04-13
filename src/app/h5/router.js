'use strict';
import React, {Component} from 'react';
import {Router, Route, Redirect, hashHistory, IndexRedirect} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import store from 'store';
import {Loading} from 'comp';
import './index.less';
const isLogin = (nextState, replaceState) => {
    if(!localStorage.getItem('userInfo')) {
        hashHistory.replace('/login');
    }
}
const history = syncHistoryWithStore(hashHistory, store);
const routes = [{
    path: '/',
    getComponent(nextState, callback) {
        require.ensure(['./view/main'], require => {
            callback(null, require('./view/main').default);
        }, 'main');
    }
}, {
    path: 'login',
    getComponent(nextState, callback) {
        require.ensure(['./view/login'], require => {
            callback(null, require('./view/login').default);
        }, 'login');
    },
    onEnter:(nextState, replaceState) => {
        if(localStorage.getItem('userInfo')) {
            replaceState('/');
        }
    }
}, {
    path: 'home',
    getComponent(nextState, callback) {
        require.ensure(['./view'], require => {
            callback(null, require('./view').default);
        }, 'home');
    },
    childRoutes: [{
        path: 'register',
        getComponent(nextState, callback) {
            require.ensure(['./view/login/register'], require => {
                callback(null, require('./view/login/register').default);
            }, 'register');
        },
    }, {
        path: 'registerMessage',
        getComponent(nextState, callback) {
            require.ensure(['./view/login/registerMessage'], require => {
                callback(null, require('./view/login/registerMessage').default);
            }, 'registerMessage');
        },
    }, {
        path: 'registerPassword',
        getComponent(nextState, callback) {
            require.ensure(['./view/login/registerPassword'], require => {
                callback(null, require('./view/login/registerPassword').default);
            }, 'registerPassword');
        },
    }, {
        path: 'forget',
        getComponent(nextState, callback) {
            require.ensure(['./view/login/forget'], require => {
                callback(null, require('./view/login/forget').default);
            }, 'forget');
        },
    }, {
        path: 'forgetMessage',
        getComponent(nextState, callback) {
            require.ensure(['./view/login/forgetMessage'], require => {
                callback(null, require('./view/login/forgetMessage').default);
            }, 'forgetMessage');
        },
    }, {
        path: 'user',
        getComponent(nextState, callback) {
            require.ensure(['./view/user'], require => {
                callback(null, require('./view/user').default);
            }, 'user');
        },
        onEnter:isLogin
    }, {
        path: 'recommend',
        getComponent(nextState, callback) {
            require.ensure(['./view/recommend'], require => {
                callback(null, require('./view/recommend').default);
            }, 'recommend');
        },
        onEnter:isLogin
    }, {
        path: 'basic',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/basic'], require => {
                callback(null, require('./view/user/basic').default);
            }, 'basic');
        },
        onEnter:isLogin
    }, {
        path: 'detailed',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/detailed'], require => {
                callback(null, require('./view/user/detailed').default);
            }, 'detailed');
        },
        onEnter:isLogin
    }, {
        path: 'authentication',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/authentication'], require => {
                callback(null, require('./view/user/authentication').default);
            }, 'authentication');
        },
        onEnter:isLogin
    }, {
        path: 'address',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/address/'], require => {
                callback(null, require('./view/user/address/').default);
            }, 'address');
        },
        onEnter:isLogin
    }, {
        path: 'addressUpdata',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/address/updata'], require => {
                callback(null, require('./view/user/address/updata').default);
            }, 'addressUpdata');
        },
        onEnter:isLogin
    }, {
        path: 'bankCard',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/bankCard/'], require => {
                callback(null, require('./view/user/bankCard/').default);
            }, 'bankCard');
        },
        onEnter:isLogin
    }, {
        path: 'bankCardUpdata',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/bankCard/updata'], require => {
                callback(null, require('./view/user/bankCard/updata').default);
            }, 'bankCardUpdata');
        },
        onEnter:isLogin
    }, {
        path: 'safetySetUp',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/safety-setUp'], require => {
                callback(null, require('./view/user/safety-setUp').default);
            }, 'safetySetUp');
        },
        onEnter:isLogin
    }, {
        path: 'safetySafety',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/safety-safety'], require => {
                callback(null, require('./view/user/safety-safety').default);
            }, 'safetySafety');
        },
        onEnter:isLogin
    }, {
        path: 'safetyLogin',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/safety-login'], require => {
                callback(null, require('./view/user/safety-login').default);
            }, 'safetyLogin');
        },
        onEnter:isLogin
    }, {
        path: 'safetyTransaction',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/safety-transaction'], require => {
                callback(null, require('./view/user/safety-transaction').default);
            }, 'safetyTransaction');
        },
        onEnter:isLogin
    }, {
        path: 'setUpFeedback',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/setUp-feedback'], require => {
                callback(null, require('./view/user/setUp-feedback').default);
            }, 'setUpFeedback');
        },
        onEnter:isLogin
    }, {
        path: 'setUpAbout',
        getComponent(nextState, callback) {
            require.ensure(['./view/user/setUp-about'], require => {
                callback(null, require('./view/user/setUp-about').default);
            }, 'setUpAbout');
        },
        onEnter:isLogin
    }, {
        path: 'serviceVoucher',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/service-voucher'], require => {
                callback(null, require('./view/homePage/service-voucher').default);
            }, 'serviceVoucher');
        },
        onEnter:isLogin
    }, {
        path: 'shoppingVoucher',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/shopping-voucher/'], require => {
                callback(null, require('./view/homePage/shopping-voucher/').default);
            }, 'shoppingVoucher');
        },
        onEnter:isLogin
    }, {
        path: 'shoppingVoucherUp',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/shopping-voucher/upload'], require => {
                callback(null, require('./view/homePage/shopping-voucher/upload').default);
            }, 'shoppingVoucherUp');
        },
        onEnter:isLogin
    }, {
        path: 'blockchain',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/blockchain/'], require => {
                callback(null, require('./view/homePage/blockchain/').default);
            }, 'blockchain');
        },
        onEnter:isLogin
    }, {
        path: 'blockchainExtract',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/blockchain/extract'], require => {
                callback(null, require('./view/homePage/blockchain/extract').default);
            }, 'blockchainExtract');
        },
        onEnter:isLogin
    }, {
        path: 'dong',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/dong'], require => {
                callback(null, require('./view/homePage/dong').default);
            }, 'dong');
        },
        onEnter:isLogin
    }, {
        path: 'integral',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/integral'], require => {
                callback(null, require('./view/homePage/integral').default);
            }, 'integral');
        },
        onEnter:isLogin     
    }, {
        path: 'Integral_flow',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/Integral_flow'], require => {
                callback(null, require('./view/homePage/Integral_flow').default);
            }, 'Integral_flow');
        },
        onEnter:isLogin
    }, {
        path: 'store',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/store'], require => {
                callback(null, require('./view/homePage/store').default);
            }, 'store');
        },
        onEnter:isLogin
    }, {
        path: 'team',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/team/'], require => {
                callback(null, require('./view/homePage/team/').default);
            }, 'team');
        },
        onEnter:isLogin
    }, {
        path: 'teamInfo',
        getComponent(nextState, callback) {
            require.ensure(['./view/homePage/team/info'], require => {
                callback(null, require('./view/homePage/team/info').default);
            }, 'teamInfo');
        },
        onEnter:isLogin
    }, {
        path: 'sign',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/sign'], require => {
                callback(null, require('./view/my/sign').default);
            }, 'sign');
        },
        onEnter:isLogin
    }, {
        path: 'myDetail/:id',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/detail'], require => {
                callback(null, require('./view/my/detail').default);
            }, 'myDetail');
        },
        onEnter:isLogin
    }, {
        path: 'help/:id',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/help'], require => {
                callback(null, require('./view/my/help').default);
            }, 'help');
        },
        onEnter:isLogin
    }, {
        path: 'recharge',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/recharge'], require => {
                callback(null, require('./view/my/recharge').default);
            }, 'recharge');
        },
        onEnter:isLogin   
    }, {
        path: 'running_water',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/money_running_water'], require => {
                callback(null, require('./view/my/money_running_water').default);
            }, 'running_water');
        },
        onEnter:isLogin
    },{
        path: 'trademark_stock',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/trademark_stock'], require => {
                callback(null, require('./view/my/trademark_stock').default);
            }, 'trademark_stock');
        },
        onEnter:isLogin
    },{
        path: 'sign',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/sign'], require => {
                callback(null, require('./view/my/sign').default);
            }, 'sign');
        },
        onEnter:isLogin
    },{
        path: 'order/:id',
        getComponent(nextState, callback) {
            require.ensure(['./view/my/order'], require => {
                callback(null, require('./view/my/order').default);
            }, 'order')
        },
        onEnter:isLogin
    }, {
        path: 'shopDetail',
        getComponent(nextState, callback) {
            require.ensure(['./view/shop/detail'], require => {
                callback(null, require('./view/shop/detail').default);
            }, 'shopDetail');
        }
    }, {
        path: 'shopCart',
        getComponent(nextState, callback) {
            require.ensure(['./view/shop/cart'], require => {
                callback(null, require('./view/shop/cart').default);
            }, 'cart');
        }
    }, {
        path: 'shopConfirm',
        getComponent(nextState, callback) {
            require.ensure(['./view/shop/confirm'], require => {
                callback(null, require('./view/shop/confirm').default);
            }, 'confirm');
        },
        onEnter:isLogin
    }, {
        path: 'success',
        getComponent(nextState, callback) {
            require.ensure(['./view/success'], require => {
                callback(null, require('./view/success').default);
            }, 'success');
        },
        onEnter:isLogin
    }]
}];
export default class extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className='view'>
                    <Router history={history} routes={routes}></Router>
                    <Loading/>
                </div>
            </Provider>
        );
    }
}