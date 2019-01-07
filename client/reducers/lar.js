import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const getLoginStatus = handleActions(
  {
    // eslint-disable-next-line no-unused-vars
    Login: (state, action) => ({
        isLogin: true
    }),
    // eslint-disable-next-line no-unused-vars
    Logout: (state, action) => ({
        isLogin: false
    }),
  },
  { isLogin: false }
);

export const postLoginResult = createSimpleAjaxReduce('PostLoginMessage');
export const postRegisterResult = createSimpleAjaxReduce('PostRegisterMessage');