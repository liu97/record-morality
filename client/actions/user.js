import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax';


// 获取用户信息
export const fetchUserInfo = createSimpleAjaxAction('/user', 'fetchUserInfo', 'get');

// 更新用户信息
export const updateUser = createSimpleAjaxAction('/user/updateUser', 'updateUser', 'put');

// 更新密码
export const updatePassword = createSimpleAjaxAction('/user/updatePassword', 'updatePassword', 'put');