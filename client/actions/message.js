import { createSimpleAjaxAction } from 'utils/ajax'


// 获取message列表
export const fetchMessageList = createSimpleAjaxAction('/admin/contacts', 'fetchMessageList', 'get');

// 删除单个message
export const deleteMessageMessage = createSimpleAjaxAction('/admin/contacts', 'deleteMessageMessage', 'delete');

// 获取单个message
export const getMessageMessage = createSimpleAjaxAction('/admin/contacts', 'getMessageMessage', 'get');

// 修改信息查看状态
export const putMessageMessage = createSimpleAjaxAction('/admin/contacts', 'putMessageMessage', 'put');

