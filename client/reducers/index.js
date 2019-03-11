import { combineReducers } from 'redux';

import {
	postLoginResult,
	postRegisterResult,
} from './lar';

import {
	fetchFolderTreeResult,
	updateFolderTreeResult,
	addFolderResult,
	deleteFolderResult,
	updateSelectedKeysResult,
	updateSelectedNoteResult,
	fetchNoteListResult,
	updateNoteStatusResult,
	fetchNoteContentResult,
	updateNoteContentResult,
	addNoteResult,
	deleteNoteResult,
	fetchNoteTrendResult,
} from './note';

const rootReducer = combineReducers({
	postLoginResult,
	postRegisterResult,

	fetchFolderTreeResult,
	updateFolderTreeResult,
	addFolderResult,
	deleteFolderResult,
	updateSelectedKeysResult,
	updateSelectedNoteResult,
	fetchNoteListResult,
	updateNoteStatusResult,
	fetchNoteContentResult,
	updateNoteContentResult,
	addNoteResult,
	deleteNoteResult,
	fetchNoteTrendResult,
});

export default rootReducer;