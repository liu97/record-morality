/**
 * @Usage: 带数字正则校验的文本输入框
 * @Description: 只可输入数字
 * @Author: xulei
 * @Email:
 * @Date: 2018/3/14
 */
import React from 'react'
import InputReg from './index'

export default class inputRegNumber extends InputReg {
  reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
  tip = '请输入数字'
}
