import './index.less';
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { Input } from 'antd';
import CommonLunar from './common';
const PREFIX = 'form-lunar';

class FormLunar extends Component{
	constructor(props){
		super(props);
		this.state = {
			showCalendar: false,
		}
	}

	componentDidMount(){
		document.onclick = this.hideCal;
	}

	UNSAFE_componentWillReceiveProps(nextProps){

	}

	matchesSelector = (element, selector) =>{
		if(element.matches){
			return element.matches(selector);
		} 
		else if(element.matchesSelector){
			return element.matchesSelector(selector);
		} 
		else if(element.webkitMatchesSelector){
			return element.webkitMatchesSelector(selector);
		} 
		else if(element.msMatchesSelector){
			return element.msMatchesSelector(selector);
		} 
		else if(element.mozMatchesSelector){
			return element.mozMatchesSelector(selector);
		} 
		else if(element.oMatchesSelector){
			return element.oMatchesSelector(selector);
		}
	}
	
	hideCal = (e) => {
		//匹配当前组件内的所有元素
		if(!this.matchesSelector(e.target,'.form-lunar *')){   
			// e.nativeEvent.stopImmediatePropagation();
			this.setState({
				showCalendar: false,
			})
		}
	}
	
	onSelect = (date) => {
		console.log(date);
	}
	
	handleInputClick = (event) => {
		this.setState((preState) => ({
			showCalendar: !preState.showCalendar,
		}))
	}

	render(){
		const props = this.props;
		const calClass = classNames({
            [props.className]: props.className != undefined,
			[PREFIX]: true,
		});
		return (
            <div className={calClass}>
				<Input onClick={this.handleInputClick} onBlur={this.handleInputBlur} className='active-input'></Input>
				<CSSTransition
					in={this.state.showCalendar}
					timeout={500}
					unmountOnExit
					classNames = "alert"
				>
					<div className='active-lunar'>
						<CommonLunar {...props}  onSelect={this.onSelect} />
					</div>
				</CSSTransition>
            </div>
		)
	}
}

export default FormLunar