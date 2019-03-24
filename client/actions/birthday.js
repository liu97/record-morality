import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax';


// 获取生日列表
export const fetchBirthdayList = createSimpleAjaxAction('/birthday', 'fetchBirthdayList', 'get');

// 删除生日提醒
export const deleteBirthday = createSimpleAjaxAction('/birthday/deleteBirthday', 'deleteBirthday', 'delete');

// 添加生日提醒
export const addBirthday = createSimpleAjaxAction('/birthday/addBirthday', 'addBirthday', 'post');

// 更新生日提醒
export const updateBirthday = createSimpleAjaxAction('/birthday/updateBirthday', 'updateBirthday', 'put');