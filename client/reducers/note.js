import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const fetchFolderTreeResult = createSimpleAjaxReduce('fetchFolderTree');

export const updateFolderTreeResult = createSimpleAjaxReduce('updateFolderTree');

export const addFolderResult = createSimpleAjaxReduce('addFolder');

export const deleteFolderResult = createSimpleAjaxReduce('deleteFolder');

export const updateSelectedKeysResult = handleActions(
    {
        updateSelectedKeys: (state, action) => ({
            keys: action.payload
        })
    },
    {keys: []}
)

export const fetchNoteListResult = createSimpleAjaxReduce('fetchNoteList');

export const fetchNoteContentResult = createSimpleAjaxReduce('fetchNoteContent');

export const updateNoteContentResult = createSimpleAjaxReduce('updateNoteContent');