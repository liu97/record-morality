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
});

export default rootReducer;