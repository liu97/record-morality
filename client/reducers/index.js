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
} from './login';

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
});

export default rootReducer;