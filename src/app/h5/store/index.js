'use strict';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducer';
import {routerReducer} from 'react-router-redux'

let createStoreWithMiddleware=applyMiddleware(thunk)(createStore);
let store=createStoreWithMiddleware(combineReducers({
    ...reducers,
    routing:routerReducer
}));
module.exports=store;