import React from 'react'
import { Input, Popover } from 'antd'

import './index.less'

export default class InputReg extends React.Component {

  constructor(props) {
    super(props)
    this.reg = props.reg || this.reg
    this.tip = props.tip || this.tip
  }

  triggerValueChange = (value) => {
    this.props.onChange && this.props.onChange(value)
  }

  // IME输入真的完成后才对文字长度做判断及处理
  handleChange = (event) => {
    const { value } = event.target
    const reg = this.reg
    if (reg) {
      if (reg.test(value) || value === '') {
        this.triggerValueChange(value)
      }
    } else {
      this.triggerValueChange(value)
    }
  }

  getInput() {
    const { props } = this
    return (
      <Input type="text" {...props} onChange={this.handleChange} />
    )
  }

  render() {
    if (!this.tip) {
      return this.getInput()
    }
    return (
      <Popover content={(<div>{this.tip}</div>)} trigger={['focus']} title="">
        {this.getInput()}
      </Popover>
    )
  }
}