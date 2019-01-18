import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const fetchFolderTreeResult = createSimpleAjaxReduce('fetchFolderTree');