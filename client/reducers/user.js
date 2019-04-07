import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const fetchUserInfoResult = createSimpleAjaxReduce('fetchUserInfo');

export const updateUserResult = createSimpleAjaxReduce('updateUser');

export const updatePasswordResult = createSimpleAjaxReduce('updatePassword');