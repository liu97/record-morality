import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const fetchFolderTreeResult = createSimpleAjaxReduce('fetchFolderTree');

export const updateFolderTreeResult = createSimpleAjaxReduce('updateFolderTree');

export const addFolderResult = createSimpleAjaxReduce('addFolder');

export const deleteFolderResult = createSimpleAjaxReduce('deleteFolder');