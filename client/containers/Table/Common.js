'use strict';

import _ from 'lodash'

import React, { Component } from 'react'
import { Spin } from 'antd'
import SearchTable from 'components/SearchTable'

export default class TableAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        this.currentPage = 1
        this.query = {}
        this.pageSize = 20
        this.rowKey = 'id'


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

    // 处理内容需要特殊处理的列
    addCustomCloumns() {
    }


    triggerSubmit() {
        this._handleSubmit(this.query, this.currentPage, this.pageSize)
    }


    _handleSubmit=(query, currentPage, pageSize) => {

        this.currentPage = currentPage;
        this.query = query;
        this.pageSize = pageSize;

        this.filterParams && this.filterParams(this.query);

        this.props.dispatch(this.fetchList({
            ...this.query,
            page: currentPage,
            pageSize: pageSize
        }))
    }

    _clear = () => {

    }
    addButtonTool = () => {

    }
    _handleAdd = () => {
        let actions = this.props.actions;
        actions.push(this.addPagePath)
    }

    cacheSearch=(formCache) => {
      //this.formCache = formCache;
        if(!this.formCache){
            this.formCache = {};
        }
        _.extend(this.formCache,formCache)
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

    render() {
        const listResult = this.listResult;
        debugger
        return (
            <div className={this.conPrefix}>
                <Spin spinning={listResult.isLoading}>
                    { this.addButtonTool() }
                    <SearchTable
                        onSubmit={this._handleSubmit}
                        search={this.getValueQuery()}
                        cacheSearch={this.cacheSearch}
                        columns={this.columnsConfig}
                        searchList={this.queryConfig}
                        tableData={listResult.info.data}
                        currentPage={this.currentPage}
                        totalCount={listResult.info.count}
                        clear={this._clear}
                        scroll={{
                        y: 400
                        }}
                        loading={false}
                        hasResetBtn={this.hasReset}
                        hasDownloadBtn={this.hasDownload}
                        hideQuery={this.hideQuery}
                        rowKey={this.rowKey}
                    />
                </Spin>
            </div>
        )
    }
}
