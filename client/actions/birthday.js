import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax';


// 获取生日列表
export const fetchBirthdayList = createSimpleAjaxAction('/birthday', 'fetchBirthdayList', 'get');

// 删除生日提醒
export const deleteBirthday = createSimpleAjaxAction('/birthday/deleteBirthday', 'deleteBirthday', 'delete');