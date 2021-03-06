import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax'

// 获取登录结果
export const PostLoginMessage = createSimpleAjaxAction('/user/login', 'PostLoginMessage', 'post');
export const PostRegisterMessage = createSimpleAjaxAction('/user/register', 'PostRegisterMessage', 'post');

export const checkNickName = createSimpleAjaxAction('/user/checkNickName', 'checkNickName', 'post');
export const checkEmail = createSimpleAjaxAction('/user/checkEmail', 'checkEmail', 'post');

export const Login = createAction('Login');

export const Logout = createAction('Logout');