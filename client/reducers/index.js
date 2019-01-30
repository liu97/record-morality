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
	fetchNoteListResult,
	fetchNoteContentResult
} from './note';

const rootReducer = combineReducers({
	postLoginResult,
	postRegisterResult,

	fetchFolderTreeResult,
	updateFolderTreeResult,
	addFolderResult,
	deleteFolderResult,
	updateSelectedKeysResult,
	fetchNoteListResult,
	fetchNoteContentResult
});

export default rootReducer;