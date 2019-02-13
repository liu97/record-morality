import { createAction } from 'redux-actions';
import { createSimpleAjaxAction } from 'utils/ajax';


// 获取文件夹树
export const fetchFolderTree = createSimpleAjaxAction('/folder', 'fetchFolderTree', 'get');

// 移动文件夹
export const updateFolderTree = createSimpleAjaxAction('/folder/updateFolder', 'updateFolderTree', 'put');

// 添加文件夹
export const addFolder = createSimpleAjaxAction('/folder/addFolder', 'addFolder', 'post');

// 删除文件夹
export const deleteFolder = createSimpleAjaxAction('/folder/deleteFolder', 'deleteFolder', 'delete');

// 设置selectedKeys
export const updateSelectedKeys = createAction('updateSelectedKeys');

// 查询笔记列表
export const fetchNoteList = createSimpleAjaxAction('/note', 'fetchNoteList', 'get');

// 查询笔记信息
export const fetchNoteContent = createSimpleAjaxAction('/note?content=true', 'fetchNoteContent', 'get');

// 修改笔记信息
export const updateNoteContent = createSimpleAjaxAction('/note/updateNote', 'updateNoteContent', 'put');
