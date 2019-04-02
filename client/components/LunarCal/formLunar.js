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

	}

	UNSAFE_componentWillReceiveProps(nextProps){

    }
	
	onSelect = (date) => {
		console.log(date);
	}
	
	handleInputClick = (event) => {
		this.setState((preState) => ({
			showCalendar: !preState.showCalendar,
		}))
	}

	handleInputBlur = (event) => {
		debugger
		this.setState({
			showCalendar: false,
		})
	}

	render(){
		const props = this.props;
		const calClass = classNames({
            [props.className]: props.className != undefined,
			[PREFIX]: true,
		});
		return (
            <div className={calClass}>
				<Input onClick={this.handleInputClick} onBlur={this.handleInputBlur}></Input>
				<CSSTransition
					in={this.state.showCalendar}
					timeout={500}
					unmountOnExit
					classNames = "alert"
				>
					<CommonLunar {...props} className='active-lunar'  onSelect={this.onSelect} />
				</CSSTransition>
            </div>
		)
	}
}

export default FormLunar