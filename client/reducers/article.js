import { handleActions } from 'redux-actions';
import { createSimpleAjaxReduce } from 'utils/ajax';

export const reducerResult = handleActions(
  {
    // eslint-disable-next-line no-unused-vars
    test: (state, action) => ({
      counter: state.counter+1
    })
  },
  { counter: 0 }
);

export const getArticleResult = createSimpleAjaxReduce('fetchArticleList');

export const getArticleMessageResult = createSimpleAjaxReduce('fetchArticleMessage');

export const getPutArticleResult = createSimpleAjaxReduce('putArticleMessage');

export const deleteArticleResult = createSimpleAjaxReduce('deleteArticleMessage');

export const postArticleResult = createSimpleAjaxReduce('postArticleMessage');


