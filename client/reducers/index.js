import { combineReducers } from 'redux';

import {
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
	getPutArticleResult,
	deleteArticleResult,
	postArticleResult,
} from './article';

import {
	getMessageListResult,
	deleteMessageResult,
	getMessageResult,
	putMessageResult,
} from './message';

import {
	postLoginResult,
	getLoginStatus,
	postRegisterResult,
} from './lar';

const rootReducer = combineReducers({
	reducerResult,
	getArticleResult,
	getArticleMessageResult,
	getPutArticleResult,
	deleteArticleResult,
	postArticleResult,
	getMessageListResult,
	deleteMessageResult,
	getMessageResult,
	putMessageResult,
	postLoginResult,
	getLoginStatus,
	postRegisterResult,
});

export default rootReducer;