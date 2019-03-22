export const COLUMNS = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 100
    },
    {
      title: '生日日期',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 100,
    },
    {
      title: '类型',
      dataIndex: 'dateType',
      key: 'dateType',
      align: 'center',
      width: 80,
    },
    {
      title: '提前天数',
      key: 'advanceDay',
      dataIndex:'advanceDay',
      align: 'center',
      width: 100,
    },
    {
      title: '提醒邮箱',
      key: 'email',
      dataIndex:'email',
      align: 'center',
      width: 200,
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex:'createdAt',
      align: 'center',
      width: 100,
    },
    {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex:'updatedAt',
      align: 'center',
      width: 100,
    },
    {
      title: '操作',
      key: 'opt',
      dataIndex:'opt',
      align: 'center',
      width: 140,
    }
  ]
  
  
  export const QUERY = [
    {
      key: 'fuzzy_name',
      label: '名字',
      placeholder: '请输入名字',
      type: 'text',
    }
  ]
  
  
  