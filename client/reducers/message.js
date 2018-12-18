import { createSimpleAjaxReduce } from 'utils/ajax';

export const getMessageListResult = createSimpleAjaxReduce('fetchMessageList');

export const deleteMessageResult = createSimpleAjaxReduce('deleteMessageMessage');

export const getMessageResult = createSimpleAjaxReduce('getMessageMessage');

export const putMessageResult = createSimpleAjaxReduce('putMessageMessage');




