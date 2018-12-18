/*
    columns: array 详见antd
    tableData: array 详见antd
    searchList: array 详见searchForm
    search: store中存储的数据
    cacheSearch: 数据改变时的回调，用以缓存数据
    tableButton: [{
            type: 'primary', 引用antd Button的type
            text: 新增, //Button展示的文本
            onClick:  //点击时回调
        }]
    // tableButton的type为custom时，内容自定义。 --HKY
    // eg:{type:'custom',content:<span key="demo">1</span>}
    // tableButton的type为pointText时，内容为提示文字。--HKY
    // eg:{type:'pointText',text: '导入模板为订单编号，城市id，频次，数据类型四个字段的EXCEL'}
    formButton: 详见 searchForm
    formColsNum: searchForm 每行展示的列数，默认为4
    hasSubmitBtn: searchForm 是否有submit 默认true
    hasResetBtn: searchForm 是否有重置按钮 默认true
    clear: 重置时的回调 详见searchForm
*/

import './index.less'

import SearchTableCommon from './Common'



export default SearchTableCommon





