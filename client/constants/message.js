export const COLUMNS = [
    {
      title: '消息ID',
      dataIndex: 'contact_id',
      key: 'contact_id',
      width: 50
    },
    {
      title: '联系者姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      // className:'search-form-table-row-textAlignLeft thtextAlignLeft',
      width: 50
    },
    {
      title: '联系者email',
      dataIndex: 'email',
      key: 'email',
      width: 50,
      // sorter: sortNumber('time'),
      // render: (text, record, index) => toDate(text)
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
      width: 100
    },
    {
      title: '联系时间',
      key: 'time',
      dataIndex:'time',
      align: 'left',
      width: 70,
    },
    {
      title: '是否查看',
      key: 'saw',
      dataIndex:'saw',
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

  ]


