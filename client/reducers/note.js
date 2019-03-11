import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const fetchFolderTreeResult = createSimpleAjaxReduce('fetchFolderTree');

export const updateFolderTreeResult = createSimpleAjaxReduce('updateFolderTree');

export const addFolderResult = createSimpleAjaxReduce('addFolder');

export const deleteFolderResult = createSimpleAjaxReduce('deleteFolder');

export const updateSelectedKeysResult = handleActions(
    {
        updateSelectedKeys: (state, action) => ({
            keys: action.payload.keys
        })
    },
    {keys: []}
)

export const updateSelectedNoteResult = handleActions(
    {
        updateSelectedNote: (state, action) => ({
            id: action.payload.id
        })
    },
    {id: null}
)

export const fetchNoteListResult = createSimpleAjaxReduce('fetchNoteList');

export const updateNoteStatusResult = handleActions(
    {
        updateNoteStatus: (state, action) => ({
            status: action.payload.status
        })
    },
    {status: 'detail'}
)

export const fetchNoteContentResult = createSimpleAjaxReduce('fetchNoteContent');

export const updateNoteContentResult = createSimpleAjaxReduce('updateNoteContent');

export const addNoteResult = createSimpleAjaxReduce('addNote');

export const deleteNoteResult = createSimpleAjaxReduce('deleteNote');

export const fetchNoteTrendResult = createSimpleAjaxReduce('fetchNoteTrend');