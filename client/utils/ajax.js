import 'whatwg-fetch';
import { createAction, handleActions } from 'redux-actions';
import { isObject, obj2String } from 'utils/object';
import config, { requestFront } from 'utils/config';
import { setCookie } from 'utils/cookie';

const checkStatus = (response) => {
	if(response.status===401){
		setCookie('isLogin', false);
		alert('身份过期，请重新登录！');
		location.reload();
	}
	if (response.status >= 200 && response.status < 300) {
		return response
	}
	const error = new Error(response.statusText)
	error.response = response
	throw error
}

const send = (url, options, cb, method = 'post') => {
	method = method.toLowerCase();
	let initObj = {};
	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`, // 从sessionStorage中获取access token
	}
	if(requestFront){
		url = requestFront + url;
	}
	if (method == 'get') { // 如果是GET请求，拼接url
		const searchStr = obj2String(options);

		if(~url.indexOf('?')){
			if(url.slice(-1) == '?'){
				url = `${url}${searchStr}`;
			}
			else{
				url = `${url}&${searchStr}`;
			}
		}
		else{
			url = `${url}?${searchStr}`;
		}

		initObj = {
		  	method: method,
			credentials: 'include',
			headers: new Headers(headers),
		}
	}
	else {
		initObj = {
		  	method,
		  	credentials: 'include',
		  	headers: new Headers(headers),
		  	body: window.JSON.stringify(options),
		}
	}
	fetch(url, initObj)
	.then(checkStatus)
	.then((response) => {
		return response.json();
	})
	.then((response) => {
		return cb ? cb(response) : response
	})
	.catch(function(e) {
	  	console.error(e);
	});
}


const requestPosts = (postTitle) => createAction(postTitle+'Request');
const receivePosts = (postTitle) => createAction(postTitle+'Receive');

export const createSimpleAjaxAction = (url, postTitle, method='post', hadInitial) => {
	return (postMessage) =>{
		if(!isObject(postMessage)){
			 postMessage = {};
		}
		if(hadInitial){
			postMessage = {...postMessage, ...config};
		}
		// eslint-disable-next-line no-unused-vars
		return (dispatch, getState) => {
			dispatch(requestPosts(postTitle)());
			send( url, postMessage, json => dispatch(receivePosts(postTitle)(json)), method );
		}
	}
};

export const createSimpleAjaxReduce = (postTitle) => {
	return handleActions(
	{
		// eslint-disable-next-line no-unused-vars
		[postTitle+'Request']: (state, action) => ({
			data: [],
			...state,
		  	isLoading: true,
		  	status: 'posting',
		}),
		[postTitle+'Receive']: (state, action) => ({
			isLoading: false,
			status: 'success',
			...action.payload
		})
	},
	{
		isLoading: false,
		status: 'not start',
		data: []
	});
}
