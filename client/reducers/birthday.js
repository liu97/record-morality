import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const fetchBirthdayListResult = createSimpleAjaxReduce('fetchBirthdayList');

export const deleteBirthdayResult = createSimpleAjaxReduce('deleteBirthday');

export const addBirthdayResult = createSimpleAjaxReduce('addBirthday');

export const updateBirthdayResult = createSimpleAjaxReduce('updateBirthday');
