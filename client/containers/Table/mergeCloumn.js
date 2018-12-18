'use strict';
import './index.less'
import _ from 'lodash'
import React, { Component } from 'react'
import { Spin } from 'antd'
import Panel from 'components/panel'
import SearchTable from 'components/SearchTable'

const PREFIX = 'table-mergeColumn'
export default class TableCommon extends Component {
  constructor(props) {
    super(props);
    this.currentPage = 1;
    this.query = {};
    this.pageSize = 20;

    this.listTotal = {};
    this.addCustomCloumns();
  }

  componentDidMount() {}

  // 处理内容需要特殊处理的列
  addCustomCloumns() {
  }

  triggerSubmit() {
    this._handleSubmit(this.query, this.currentPage, this.pageSize)
  }


  _handleSubmit = (query, currentPage, pageSize) => {

    this.currentPage = currentPage;
    this.query = query;
    this.pageSize = pageSize;

    this.filterParams && this.filterParams(this.query);
    this.props.dispatch(this.fetchList({
      ...query,
      page: currentPage,
      perpage: pageSize
    }))

  }

  _clear = () => {

  }

  _handleAdd = () => {
    let actions = this.props.actions;
    actions.push(this.addPagePath)
  }

  cacheSearch = (formCache) => {
    //this.formCache = formCache;
    if (!this.formCache) {
      this.formCache = {};
    }
    _.extend(this.formCache, formCache)
  }

  getValueQuery() {
    let query = this.query;
    let result = Object.keys(query).map(key => {
      let obj = {}
      obj[key] = {
        value: query[key]
      }
      return obj
    })
    _.extend(result, this.formCache)
    return result
  }

  /**
  * basis 和并列的依据，比如id
  * item  一行
  **/
  merge(basis, item) {
    if(!this.listTotal[basis]){
      this.listTotal[basis] = 0;
      item.first_item = true;
    }
    this.listTotal[basis]++;
  }


  render() {
    const listResult = Object.assign({info:{list:[],pagination:{total:0}},loading:true}, this.listResult);
    listResult.info.list = listResult.info.list.map((item)=>{
      if(item.creative){
        return Object.assign(item, item.creative, item.group);
      }
      return item;
    })
    return (
      <div className={this.conPrefix}>
      <Panel id={this.id} classNames={`${PREFIX} ${this.prefix}`}>
        <Spin spinning={listResult.loading}>
          <SearchTable
            onSubmit={this._handleSubmit}
            search={this.getValueQuery()}
            cacheSearch={this.cacheSearch}
            columns={this.columnsConfig}
            searchList={this.queryConfig}
            tableData={listResult.info.list}
            currentPage={this.currentPage}
            totalCount={listResult.info.pagination.total}
            hideQuery={this.hideQuery||false}
            clear={this._clear}
            scroll={{ x: this.scrollX, y: 500 }}
            loading={false}
            tableTools={this.getTabelTools()}
          />
      </Spin>
    </Panel>
    </div>
    )
  }
}



