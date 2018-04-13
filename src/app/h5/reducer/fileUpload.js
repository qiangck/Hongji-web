import { combineReducers } from 'redux';
import {fileUpload} from 'action';

function file(state = [], action) {
    switch (action.type) {
        case fileUpload.type.file:
            return action.next;
        default:
            return state;
    }
}

module.exports = combineReducers({ file });