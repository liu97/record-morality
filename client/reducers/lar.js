import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const postLoginResult = createSimpleAjaxReduce('PostLoginMessage');
export const postRegisterResult = createSimpleAjaxReduce('PostRegisterMessage');