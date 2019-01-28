import './index.less';
import './style/reset.less';
import 'babel-polyfill';
import 'url-search-params-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduexs from 'reducers';
import ConfirmLogin from 'components/ConfirmLogin';

let store = createStore(
	reduexs,
	applyMiddleware(thunk)
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConfirmLogin></ConfirmLogin>
    </Router>
  </Provider>,
  document.getElementById('root')
);