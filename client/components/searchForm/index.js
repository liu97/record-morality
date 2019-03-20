import './index.less'
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import { Button, Form, Input, Row, Col, Select, DatePicker, Affix, AutoComplete } from 'antd';
import moment from 'moment'
import QueueAnim from 'rc-queue-anim'
import classNames from 'classnames';
import 'components/index.less'
import { chunk } from 'lodash'
import MultiSelect from '../multiSelect'
import InputRegNumber from 'components/InputReg/Number'

const InputGroup = Input.Group
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker;

@Form.create({
  onFieldsChange(props, items) {
    props.cacheSearch(items);
  },
  mapPropsToFields(props) {
    const fields = {}
    props.searchList.map((item) => {
      if (typeof (item.key) !== 'string') {
        for (let i = 0; i < item.key.length; i++) {
          fields[item.key[i]] = props.search[item.key[i]];
        }
      } else {
        fields[item.key] = props.search[item.key]
      }
    })
    return Form.createFormField(fields);
  },
})

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.clear = this.clear.bind(this)
    this.formButtonClick = this.formButtonClick.bind(this)

    this.state = {
        itemWidth: 280,
        formAffix: 1000
    }
  }
  componentDidMount() {
     this.setWdith();
     window.addEventListener('resize', _.debounce(this.setWdith.bind(this), 500))
  }
  componentWillUnmount() {
     window.removeEventListener('resize', this.setWdith.bind(this))
  }
  onSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (!err) {
        Object.keys(values).map((key) => {
          (values[key] === undefined||values[key] === '') && delete (values[key])
        })
        this.props.onSubmit(values)
      }
    })
  }

  onDownload = (e)=>{
    e.preventDefault()
    this.props.form.validateFieldsAndScroll({ force: true }, (err, query) => {
      Object.keys(query).map((key) => {
        if(query[key] === undefined){
          delete (query[key])
        } else if(key === 'time'){
          const time = query[key]
          query['startDate'] = time[0].format('YYYY-MM-DD')
          query['endDate'] = time[1].format('YYYY-MM-DD')
          delete (query[key])
        }
      })
      this.props.download && this.props.download(query)
    })
  }

  getFormsValue() {
    return this.props.form.getFieldsValue()
  }
  getSearchItem(item) {
    switch (item.type) {
    case 'select': return this.getSelect(item)
    case 'text': return this.getText(item)
    case 'numberText': return this.getNumberText(item)
    case 'autoComplete': return this.getAutoComplete(item)
    case 'groupNumber': return this.getGroupNumber(item)
    case 'rangePicker': return this.getRangePicker(item)
    case 'dyRangePicker': return this.getDyRangePicker(item)
    case 'multiSelect': return this.getMultiSelect(item)
    case 'defaultMultiSelect': return this.getDefaultMultiSelect(item)
    case 'showSearchSelect': return this.getShowSearchSelect(item)
    case 'self': return this.getSelfCustom(item)
    default: this.getText(item); break;
    }
    return [];
  }

  fieldDecorator(item) {
    const { getFieldDecorator } = this.props.form
    return (component) => getFieldDecorator(item.key, { ...item })(component)
  }

  getText(item) {
    return this.fieldDecorator(item)(<Input placeholder={item.placeholder} style={{height: '32px'}} />)
  }

  getNumberText(item) {
    return this.fieldDecorator(item)(
      <InputRegNumber placeholder={item.placeholder} />
    )
  }
  getSelect(item) {
    // antd的Option value只支持string类型，把value转成string类型并且在
    // onChange时判断value是否为纯数字，是的话转回数字形式。 --hky
    let onChange = (value) => {
      item.onChange && (/^\d+$/.test(value) ? item.onChange(parseInt(value, 10)) : item.onChange(value))
    }
    return this.fieldDecorator(item)(
      <Select
        placeholder={item.placeholder}
        onChange={onChange}
      >
        {item.options.map((option, index) =>
          <Option key={index}
            value={option[item.value] === null ? null : option[item.value]}
          >{option[item.text]}</Option>)}
      </Select>
    )
  }
  getAutoComplete(item) {
    const set = new Set(this.getTplTitle())
    const dataSource = [...set]

    const onSelect = () => { }
    return this.fieldDecorator(item)(
      <AutoComplete
        dataSource={dataSource}
        filterOption
        onSelect={onSelect}
        placeholder=""
      />
    )
  }
  getShowSearchSelect(item) {
    // antd的Option value只支持string类型，把value转成string类型并且在
    // onChange时判断value是否为纯数字，是的话转回数字形式。 --hky
    let onChange = (value) => {
      item.onChange && (/^\d+$/.test(value) ? item.onChange(parseInt(value, 10)) : item.onChange(value))
    }

    return this.fieldDecorator(item)(
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={onChange}
        placeholder={item.placeholder}
      >
        {item.options.map((option, index) =>
          <Option key={index}
            value={option[item.value] === null ? null : option[item.value]}
          >{option[item.text]}</Option>)}
      </Select>
    )
  }

  getSelfCustom=(item)=>{
    const { setFieldsValue } = this.props.form;
    return this.fieldDecorator(item)(
      this.props.selRender && this.props.selRender(item,setFieldsValue)
    )
  }

  getGroupNumber(item) {
    return (
      <InputGroup>
        {
          item.key.map((key, index) => (
            <Col span={24 / parseInt(item.key.length, 10)} key={index} >
              {this.fieldDecorator({ key: key })(
                <Input type="number" />
              )}
            </Col>
            )
          )
        }
      </InputGroup>
    )
  }
  getDefaultMultiSelect(item) {
    let children = []
    const itemArr = item.text.split(',')
    item.options.map((option, index) => {
      children.push(
        <Option
          key={index}
          value={option[item.value] === null ? null : option[item.value]}
        >
          {
            itemArr.length === 2 ? option[itemArr[0]] + option[itemArr[1]] : option[item.text]
          }
        </Option>
      )
    })
    return this.fieldDecorator(item)(
      <Select
        multiple
        style={{ width: '100%' }}
        placeholder="请选择"
      >
        {children}
      </Select>
    )
  }

  getRangePicker(item) {
    const { setFieldsValue } = this.props.form
    return this.fieldDecorator(_.extend({}, item, { initialValue: [moment(), moment()] }))(
      <RangePicker
        onFieldsChange={setFieldsValue}
        format="YYYY/MM/DD"
        disabledDate={ current => current && (current.valueOf() > Date.now() || (item.startTime && current.valueOf()<item.startTime)) }
        ranges={{
          '今天': [moment({hours:0, minutes:0, seconds:0}), moment()],
          '昨天': [moment({hours:0, minutes:0, seconds:0}).add(-1, 'days'), moment({hours:23, minutes:59, seconds:59}).add(-1, 'days')],
          '过去7天': [moment({hours:0, minutes:0, seconds:0}).add(-7, 'days'), moment()],
          '过去30天': [moment({hours:0, minutes:0, seconds:0}).add(-30, 'days'), moment()]
        }}
      />
    )
  }

  getDyRangePicker(item) {
    return this.fieldDecorator(_.extend({}, item, { initialValue: [moment().subtract(7, 'days'), moment()] }))(
      <RangePicker
        format="YYYY/MM/DD"
        disabledDate={ current => current && current.valueOf() > Date.now() }
      />
    )
  }

  getMultiSelect(item) {
    const { setFieldsValue } = this.props.form;
    return this.fieldDecorator(item)(<MultiSelect
                                        keyName={item.key}
                                        id={item.value}
                                        text={item.text}
                                        options={item.options}
                                        onFieldsChange={setFieldsValue}
                                     />)
  }

  getDomWidth(refstext){
      let doms = ReactDOM.findDOMNode(this.refs[refstext]);
      let styles = doms && document.defaultView.getComputedStyle(doms,null);
      let _width = styles && styles.width;
      return parseInt(_width || 0);
  }
  setWdith(){
      let _allWidth = this.getDomWidth('searchForm')-16,    //总宽度
          _buttonWidth = this.getDomWidth('searchButton'),  //botton宽度
          searchCount = this.props.searchList.length,       //搜索表单个数
          realWidth = _allWidth,                            //实际宽度，默认为总宽度
          reallen = searchCount;                            //实际一行显示个数，默认为表单个数
      this.setState({ formAffix: _allWidth })
      let affixDiv = document.getElementsByClassName('ant-affix');
      if(affixDiv.length && _allWidth>0){
          Array.prototype.forEach.call(affixDiv, function(item) {
              item.style.width = _allWidth + 'px';       //affix没有响应式，给antd里的div设置宽度。
          });
      }
      let maxCount = Math.floor(realWidth/280);             //不算按钮，一行最大显示个数
           // minCount = Math.floor(_allWidth/400);
      //console.log(_allWidth, searchCount, maxCount,'====')
      if(searchCount > maxCount){           //表单个数>最大显示个数；实际个数=最大个数
          reallen = maxCount
      }else if(searchCount < maxCount){     //表单个数<最大显示个数；实际个数=表单个数，实际宽度=总宽度-按钮宽度
          realWidth = _allWidth - _buttonWidth;
      }else{                                //临界情况，表单个数=最大显示个数；确定是一行显示，还是换行显示
          let critilen = Math.floor((_allWidth - _buttonWidth)/280);  //获取临界值：一行显示的个数
          if(critilen == reallen){          //如果临界个数=实际个数， 则按一行摆放；否则分行，按钮单独一行。
              realWidth = _allWidth - _buttonWidth;
          }
      }
      let _w = realWidth/reallen,   //实际宽度/实际个数
          realW = _w;               //实际宽度

      if(_w > 0 && _w < 280){       //控制最小宽度280
          realW = 280;
      }else if(_w>400 && searchCount<=maxCount){  //表单个数<=最大个数时，控制最大宽度400
          realW = 400;
      }
      if(_w > 0){
          this.setState({
             itemWidth: realW
          })
      }

  }
  // eslint-disable-next-line no-unused-vars
  renderRow(arr, index) {
    const { formColsNum } = this.props;
    // eslint-disable-next-line no-unneeded-ternary
    const cols = formColsNum ? formColsNum : 4;
    return (
      <QueueAnim key={index}>
        {
          arr.map((item, key) => (
            <Col md={24 / cols} key={key} style={{display:item.show === false?'none':'',width:this.state.itemWidth}}>
              <FormItem label={item.label} labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                {this.getSearchItem(item)}
              </FormItem>
            </Col>
          ))
        }
      </QueueAnim>
    )
  }
  getTplTitle() {
    const { tableData } = this.props
    const arr = []
    if (tableData.length > 0) {
      tableData.forEach( (item) => {
        arr.push(item.title)
      })
      return arr
    }
  }
  clear() {
    this.props.form.resetFields();
    this.props.clear()
  }

  formButtonClick(item) {
    return () => {
      const fieldsValue = this.getFormsValue();
      item.onClick && item.onClick(fieldsValue);
    }
  }

  getFormButton() {
    const buttons = [];
    this.props.formButton && this.props.formButton.length
    && this.props.formButton.map((item, index) => {
      buttons.push(
        <Button key={index} type={item.type}
          onClick={this.formButtonClick(item)}
        >{item.text}</Button>)
    })
    return buttons
  }

  render() {
    const { searchList, formColsNum, form } = this.props;
    let formClassName = classNames({
      'ant-advanced-search-form': true,
      'ant-advanced-search-blank': !searchList.length
    })
    const cols = formColsNum ? formColsNum : 4;

    const formValues = form.getFieldsValue()
    const realSearchList = searchList.map(searchItem => {
      if (searchItem.type === 'customRender') {
        return searchItem.renderConfig(formValues)
      }
      return searchItem
    }).filter(item => !!item)

    return (
      <Form onSubmit={this.onSubmit} className={formClassName} ref="searchForm">
        <Affix ref="formAffix" style={{width:this.state.formAffix}} className="affix-search-form">
          <Row gutter={16}>
            {
              chunk(realSearchList, cols).map((row, index) => this.renderRow(row, index))
            }
            <div className="search-form-buttons" ref="searchButton">
              {this.getFormButton()}
              {this.props.hasSubmitBtn === false ? null : <Button type="primary" htmlType="submit">搜索</Button>}
              {this.props.hasResetBtn === false ? null : <Button onClick={this.clear}>重置</Button>}
              {this.props.hasDownloadBtn === false ? null : <Button type="primary" onClick={this.onDownload}>下载报表</Button>}
            </div>
          </Row>
        </Affix>
      </Form>
    )
  }
}

export default SearchForm;