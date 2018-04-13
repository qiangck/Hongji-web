import { combineReducers } from 'redux';
import {shopping} from 'action';

function shoppingData(state = {}, action) {
    switch (action.type) {
        case shopping.type.data:
            return action.next;
        default:
            return state;
    }
}

module.exports = combineReducers({ shoppingData });