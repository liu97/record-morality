import { combineReducers } from 'redux';

import {
	postLoginResult,
	getLoginStatus,
	postRegisterResult,
} from './lar';

import {
	fetchFolderTreeResult,
} from './note';

const rootReducer = combineReducers({
	postLoginResult,
	getLoginStatus,
	postRegisterResult,

	fetchFolderTreeResult,
});

export default rootReducer;