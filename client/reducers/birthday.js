import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const fetchBirthdayListResult = createSimpleAjaxReduce('fetchBirthdayList');
