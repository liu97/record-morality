import { message } from 'antd'

export const modifySuccess = (msg)=>{
  message.destroy();
	message.success((msg || '修改成功'), 5)
}

export const success = ()=>{
  message.destroy();
	message.success('操作成功', 5)
}

export const modifyFail = (msg)=>{
  message.destroy();
	message.error('修改失败，'+(msg||'服务器错误'), 5)
}

export const errorMessage = (msg, time) => {
	message.destroy()
	message.error(msg, time)
}
