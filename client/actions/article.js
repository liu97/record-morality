import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax';

export const test = createAction('test');

// 获取article列表
export const fetchArticleList = createSimpleAjaxAction('/admin/articles', 'fetchArticleList', 'get');

// 删除单个article
export const deleteArticleMessage = createSimpleAjaxAction('/admin/articles', 'deleteArticleMessage', 'delete');

// 获取单个article信息
export const fetchArticleMessage = createSimpleAjaxAction('/admin/articles', 'fetchArticleMessage', 'get');

// 修改单个article信息
export const putArticleMessage = createSimpleAjaxAction('/admin/articles', 'putArticleMessage', 'put');

// 新增article
export const postArticleMessage = createSimpleAjaxAction('/admin/articles', 'postArticleMessage', 'post');
