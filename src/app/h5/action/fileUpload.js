import {getActionType,getAction} from './common';
let type = getActionType('fileUpload', {file: ''});
let creator = {
    file: getAction(type.file, 'next')
};
module.exports = {
    type: type,
    creator: creator
};