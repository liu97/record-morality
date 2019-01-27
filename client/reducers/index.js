import { combineReducers } from 'redux';

import {
	postLoginResult,
	getLoginStatus,
	postRegisterResult,
} from './lar';

import {
	fetchFolderTreeResult,
	updateFolderTreeResult,
	addFolderResult,
	deleteFolderResult,
} from './note';

const rootReducer = combineReducers({
	postLoginResult,
	getLoginStatus,
	postRegisterResult,

	fetchFolderTreeResult,
	updateFolderTreeResult,
	addFolderResult,
	deleteFolderResult,
});

export default rootReducer;