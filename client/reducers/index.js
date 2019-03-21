import { combineReducers } from 'redux';

import {
	postLoginResult,
	postRegisterResult,
	checkNickNameResult,
	checkEmailResult,
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

import {
	fetchBirthdayListResult,
	deleteBirthdayResult,
	addBirthdayResult,
} from './birthday';

const rootReducer = combineReducers({
	postLoginResult,
	postRegisterResult,
	checkNickNameResult,
	checkEmailResult,

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

	fetchBirthdayListResult,
	deleteBirthdayResult,
	addBirthdayResult,
});

export default rootReducer;