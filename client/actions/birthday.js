import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax';


// 获取文件夹树
export const fetchBirthdayList = createSimpleAjaxAction('/birthday', 'fetchBirthdayList', 'get');