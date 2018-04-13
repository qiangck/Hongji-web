import {getActionType,getAction} from './common';
let type = getActionType('shopping', {data: ''});
let creator = {
    data: getAction(type.data, 'next')
};
module.exports = {
    type: type,
    creator: creator
};