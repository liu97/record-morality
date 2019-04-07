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
	updateBirthdayResult,
} from './birthday';

import {
	fetchUserInfoResult,
	updateUserResult,
	updatePasswordResult,
} from './user';

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
	updateBirthdayResult,

	fetchUserInfoResult,
	updateUserResult,
	updatePasswordResult,
});

export default rootReducer;