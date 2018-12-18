export const COLUMNS = [
  {
    title: '文章ID',
    dataIndex: 'article_id',
    key: 'id',
    width: 40
  },
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
    align: 'left',
    // className:'search-form-table-row-textAlignLeft thtextAlignLeft',
    width: 100
  },
  {
    title: '文章标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 50,
    // sorter: sortNumber('time'),
    // render: (text, record, index) => toDate(text)
  },
  {
    title: '点赞数',
    dataIndex: 'praise',
    key: 'praise',
    width: 40
  },
  {
    title: '上传时间',
    key: 'upload_time',
    dataIndex:'upload_time',
    align: 'left',
    width: 70,
  },
  {
    title: '最后修改时间',
    key: 'last_modify_time',
    dataIndex:'last_modify_time',
    align: 'left',
    width: 70,
  },
  {
    title: '文章类型',
    key: 'type',
    dataIndex:'type',
    align: 'left',
    width: 50,
  },
  {
    title: '操作',
    key: 'opt',
    dataIndex:'opt',
    align: 'left',
    className:'search-form-table-row-textAlignLeft thtextAlignLeft',
    width: 50,
  }
]


export const QUERY = [
  {
    key: 'id',
    label: '文章ID',
    placeholder: '请输入文章ID',
    type: 'text',
  },
  {
    key: 'fuzzy_title',
    label: '文章标题',
    placeholder: '请输入文章标题',
    type: 'text',
  }
]


