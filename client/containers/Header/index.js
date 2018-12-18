import './index.less';
import React, { Component } from 'react';

class Header extends Component{
	render(){
		return (
			<div className={'header-container'}>
				{'你好,管理员'}
			</div>
		)
	}
}

export default Header