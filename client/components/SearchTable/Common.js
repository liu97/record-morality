'use strict';

import React, { Component } from 'react'
import _ from 'lodash'
// import { connect } from 'react-redux'
import 'components/index.less'
import { Table, Button } from 'antd'
import SearchForm from '../searchForm'
import {getFromStorage} from 'utils/storage'

export default class SearchTable extends Component {
  // eslint-disable-next-line react/sort-comp
  beforeSorter = null;
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.getFormValue = this.getFormValue.bind(this);
    this.pageSize = this.props.pageSize || 20;
    this.state = {
      current: 1,
      scroll: props.scroll,
    	showColumns: getFromStorage ? (window.JSON.parse(getFromStorage('showColumns')) || props.columns) : props.columns,
      selectedRowKeys: []
    };

    this.myRef = React.createRef();

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      selectedRowKeys:[],
    });
  	this.onSubmit(this.getFormValue())
  	//this.props.form.submit((a)=>{console.log(a())})
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.selectedRowKeys!==nextProps.selectedRowKeys&&nextProps.selectedRowKeys){
      this.setState({
        selectedRowKeys: nextProps.selectedRowKeys
      })
    }
  }

  onSubmit(query, current = 1, pageChangePlg) {
    this.setState({
      current: 1,
      selectedRowKeys:[],
    });
    this.props.onSubmit(query, current, this.pageSize,pageChangePlg);
  }
  onChange(pagination, filters, sorter){
    if(!_.isEmpty(sorter)){
      if (!this.beforeSorter) {
        this.beforeSorter = _.cloneDeep(sorter)
        this.setState({
          current: 1
        });
      } else {
        if(this.beforeSorter.columnKey!==sorter.columnKey || this.beforeSorter.order!==sorter.order){
          this.beforeSorter = null;
          this.beforeSorter = _.cloneDeep(sorter)
          this.setState({
            current: 1
          });
        }
      }
    }

    this.props.onChange && this.props.onChange(pagination, filters, sorter);
  }

  componentWillUnmount(){

  }

  tableButtonClick(item) {
    console.log('item', item)
    return () => {
      const query = this.getFormValue();
      query.currentPage = this.props.currentPage
      item.onClick && item.onClick(query);
    }
  }

  getFormValue() {
    console.log('getFormValue', this.props.hideQuery)
    if (this.props.hideQuery) {
      return {}
    }
    const form = this.props.formRef ? this.props.formRef : this.myRef
    // eslint-disable-next-line react/no-string-refs
    const query = form.getFieldsValue?form.getFieldsValue():{};
    Object.keys(query).map((key) => {
     // console.log(key, query[key]);
      (query[key] === undefined||query[key] === '') && delete (query[key])
    })
    return query
  }

  // eslint-disable-next-line no-unused-vars
  _handleSelectionChange=(selectedRowKeys, selectedRows)=>{
  	this.setState({
  		selectedRowKeys: selectedRowKeys
  	})
  	this.props.onSelectionChange&&this.props.onSelectionChange(selectedRowKeys)
  }

  render() {
    const _self = this
    const {
            tableData,
            columns,
            searchList,
            search,
            cacheSearch,
            pageCount, // eslint-disable-line no-unused-vars
            currentPage,
            totalCount,
            clear,
            loading,
            formButton,
            tableButton,
            formColsNum,
            hasSubmitBtn,
            hasResetBtn,
            scroll,
            download,
            hasDownloadBtn,
            pageSizeOptions,
            pageNoSubmit,
            hideQuery,
            showSizeChanger,
            current,
            onRowClick,
            onChange,
            selRender,
            customerPage,
            rowKey,
        } = this.props

    //此处这么做是为了解决 强制分页要回到首页
    let _current = _self.state.current;
    if (current !== undefined) {
      _current = _self.state.current === current ? _self.state.current : 1;
    }

    const pagination = {
      total: totalCount,
      defaultCurrent: currentPage,
      //current: _self.state.current,
      current:customerPage?currentPage:_current,
      showSizeChanger: showSizeChanger===false?false:true,
      defaultPageSize: pageSizeOptions ? pageSizeOptions[0] : 20,
      showQuickJumper: true,
      showTotal(count) {
        return `共 ${count} 条`
      },
      pageSizeOptions: pageSizeOptions || ['10', '20', '50', '100'],
      onChange(current, pageSize) {
        const query = _self.getFormValue();
        _self.pageSize =  pageSize;
        if(!pageNoSubmit){
          _self.onSubmit(query, current, pageSize,'pageChange')
        }
        _self.setState({
          current: current
        });
      },
      onShowSizeChange(current, pageSize) {
        const query = _self.getFormValue();
        _self.pageSize = pageSize;
        if(!pageNoSubmit){
          _self.onSubmit(query, current, pageSize,'pageChange')
        }

      }
    }
    let buttons = []
    if (tableButton) {
      buttons = tableButton.map((item, index) => {
        console.log('item', item)
        if (!item.type) {
          return <span key={index} className="text-info text-2x" style={{ verticalAlign: 'top' }}>{item.text}</span>
        }
        if (item.type === 'custom') {
          return item.content
        }
        if (item.type === 'pointText') {
          return (<p key={index}
                      style={{ lineHeight: '30px',
                      color: item.textColor ? item.textColor : 'red' }}
                  >{item.text}</p>)
        }
        return (<Button key={index} type={item.type}
                    onClick={this.tableButtonClick(item)}
                >{item.text}</Button>)
      })
    }

    let rowSelectionConfig = null;

    if(this.props.selectedRowKeys !== undefined){
      rowSelectionConfig = {
        selectedRowKeys: this.state.selectedRowKeys,
        onChange: this._handleSelectionChange,
      }

      const { getDisabledRow, permission } = this.props
      if (getDisabledRow || permission) {
        rowSelectionConfig.getCheckboxProps = record => {
          const disabled = (permission && permission.stage > permission.STAGES.STAGE_0)
              || (getDisabledRow && getDisabledRow(record))
          return { disabled: disabled }
        }
      }
    }
    return (
      <div className="search-form-table">
        {
          hideQuery ?
          null :
          <SearchForm
            ref={this.props.formRef ? this.props.formRef : this.myRef}
            onSubmit={this.onSubmit}
            manual={_self.props.manual}
            searchList={searchList}
            cacheSearch={cacheSearch}
            search={search}
            clear={clear}
            tableData={tableData}
            formButton={formButton}
            formColsNum={formColsNum}
            hasSubmitBtn={hasSubmitBtn}
            hasResetBtn={hasResetBtn}
            download={download}
            hasDownloadBtn= {hasDownloadBtn}
            selRender={selRender}
          />
        }
        <div className="table-button">
          { buttons }
        </div>
          {this.props.tableTools&&this.props.tableTools}

          {this.getTabelTools&&this.getTabelTools()}
          <Table
            columns={this.state.showColumns || columns }
            dataSource={tableData}
            pagination={currentPage ? pagination : false}
            scroll={ this.state.scroll || scroll }
            loading={loading}
            rowSelection={ this.props.rowSelection || rowSelectionConfig }
            onChange={onChange}
            current={this.state.current}
            bordered={ this.props.bordered }
            onRowClick={ onRowClick }
            rowKey={ rowKey }
          />

      </div>
    )
  }
}
