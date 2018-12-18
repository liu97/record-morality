import _ from 'lodash'
import React, { Component } from 'react'
import { Spin } from 'antd'
import Panel from 'components/panel'
import SearchTable from 'components/SearchTable'
import { getFromStorage } from 'utils/storage'

export default class TableCommon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: this.getDefaultSelectedRowKeys(),
    }
    this.currentPage = 1
    this.query = {}
    this.pageSize = 20
    this.addCustomCloumns();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // 修改表格内容后刷新表格示例
    let batchChangeCampaignOpStatusResult = nextProps.batchChangeCampaignOpStatusResult;
    if (batchChangeCampaignOpStatusResult !== this.props.batchChangeCampaignOpStatusResult &&
      batchChangeCampaignOpStatusResult && batchChangeCampaignOpStatusResult.loading === false && !batchChangeCampaignOpStatusResult.hasError) {
      this.triggerSubmit()
    }
  }

  getDefaultSelectedRowKeys=()=>{
    if(this.props.triggerPrevClickPlgResult&&this.props.triggerPrevClickPlgResult.prev){
      return window.JSON.parse(getFromStorage('step2-1-selected','session'))
    }
    return {}
  }
  // 处理内容需要特殊处理的列
  addCustomCloumns() {
  }

  triggerSubmit() {
    this._handleSubmit(this.query, this.currentPage, this.pageSize)
  }


  _handleSubmit = (query, currentPage, pageSize, pageChangePlg) => {

    this.currentPage = currentPage;
    this.query = query;
    this.pageSize = pageSize;

    this.filterParams && this.filterParams(this.query);
    this.filterCurrentPage && this.filterCurrentPage(this.currentPage);

    this.fetchList && this.fetchList({
      ...query,
      page: this.currentPage,
      perpage: this.pageSize,
    },pageChangePlg)
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

  handleSelectionChange = (selectedRowKeys, selectedRows) => { //批量选择
    selectedRowKeys.sort((a,b)=>{
      return a-b;
    });
    let currentPage = this.currentPage;
    let pageSize = this.pageSize;
    this.setState((prevState)=>{
      let rowKeys = _.cloneDeep(prevState.selectedRowKeys)
      for(let i = 0; i < pageSize; i++ ){
        let row = i + (currentPage-1) * pageSize;
        let isExist = selectedRowKeys.indexOf(i);
        if( isExist != -1){
          rowKeys[row] = selectedRows[isExist];
        }
        else{
          delete rowKeys[row];
        }
      }
      this._handleSelectionChange(rowKeys, selectedRows)
      return {
        selectedRowKeys: rowKeys
      }
    })
  }


  showCurrentPageSelected(){
    let selected = [];
    for(let key of Object.keys(this.state.selectedRowKeys)){
      if(key>=(this.currentPage-1)*this.pageSize && key<(this.currentPage*this.pageSize)){
        selected.push(key - (this.currentPage-1)*this.pageSize);
      }
    }
    selected = selected.filter((value)=>{
      return value != undefined;
    })
    return selected;
  }

  render() {
    const listResult = Object.assign({info:{list:[],pagination:{total:0}},loading:true}, this.props.listResult);
    if (listResult.info.list[0] && listResult.info.list[0].creative){
      listResult.info.list = listResult.info.list.map((item)=>{
        return Object.assign(item.creative, item.group);
      })
    }
    let rowSelectionConfig = {
      selectedRowKeys: this.showCurrentPageSelected && this.showCurrentPageSelected(),
      onChange: this.handleSelectionChange
    }
    return (
      <div className={this.conPrefix}>
        <Panel id={this.id} classNames={this.prefix}>
          <Spin spinning={listResult.loading}>
            <SearchTable
              onSubmit={this._handleSubmit}
              search={this.getValueQuery()}
              cacheSearch={this.cacheSearch}
              columns={this.columnsConfig}
              searchList={this.queryConfig}
              tableData={listResult.info.list}
              currentPage={this.currentPage}
              customerPage
              totalCount={listResult.info.pagination.total}
              hideQuery={this.hideQuery||false}
              rowSelection={ this.showSelectedRowKeys ? rowSelectionConfig : null}
              clear={this._clear}
              scroll={{
                  y: 500
              }}
              loading={false}
              tableTools={this.getTabelTools()}
            />
        </Spin>
      </Panel>
      </div>
    )
  }
}



