import './index.less';
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { Input, Icon } from 'antd';
import chineseLunar from 'chinese-lunar';
import CommonLunar from './Common';
import moment from 'moment';
const PREFIX = 'form-lunar';

class FormLunar extends Component{
	constructor(props){
		super(props);
		this.state = {
			showCalendar: false,
			inputValue: this.formatDate(props.defaultValue || props.value),
			dateValue: props.defaultValue || props.value,
		}
	}

	componentDidMount(){
		document.addEventListener("click", this.hideCal);
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		let { value } = nextProps;
		if(value !== this.props.value && value) {
			this.setState({
				dateValue: value,
			})
		}
	}

	componentWillUnmount(){
		document.removeEventListener('click', this.hideCal);
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
		if(!this.matchesSelector(e.target,'.form-lunar *')){ //匹配当前组件内的所有元素
			this.setState({
				showCalendar: false,
			})
		}
	}

	formatDate = (date) => { // 根据类型格式化日期
		const props = this.props;
		let inputValue = null;
		if(date){
			if(props.dateType == 'solar'){ // 如果是阳历类型
				if(date.solarTime){
					inputValue = date.solarTime.format('YYYY-MM-DD');
				}
				else{
					inputValue = date.format('YYYY-MM-DD');
				}
			}
			else{
				if(date.lunarTime){
					inputValue = date.lunarTime.dateValue;
				}
				else{
					let lunarTime = chineseLunar.solarToLunar(new Date(date.format('YYYY-MM-DD 00:00:00')));
					let tradition = chineseLunar.format(lunarTime, 'T(A)Md');
					inputValue = `${lunarTime.year}-${lunarTime.month}-${lunarTime.day} ${tradition}`;
				}
			}
		}
		return inputValue;
	}
	
	onSelect = (date) => { // 点击选择日期回调
		let inputValue = this.formatDate(date);

		this.selectedDate = date;
		this.setState({
			inputValue,
			showCalendar: false,
			dateValue: date,
		});

		this.props.onChange && this.props.onChange(date);

		this.props.onSelect && this.props.onSelect(date);
	}
	
	handleInputClick = (event) => {
		this.setState((preState) => ({
			showCalendar: !preState.showCalendar,
		}))
	}

	handleClear = (event) => {
		this.setState({
			inputValue: null,
			dateValue: {},
		});
	}

	render(){
		const props = _.cloneDeep(this.props);
		const state = this.state;
		const defaultValue = (state.dateValue && state.dateValue.solarTime) || moment();
		const calClass = classNames({
            [props.className]: props.className != undefined,
			[PREFIX]: true,
		});

		delete props.className;
		delete props.onSelect;
		delete props.onChange;
		delete props.value;
		return (
            <div className={calClass}>
				<Input 
					value={state.inputValue} 
					onClick={this.handleInputClick} 
					onBlur={this.handleInputBlur} 
					className='active-input'
					suffix={<React.Fragment><Icon type="calendar" /><Icon type="close-circle" onClick={this.handleClear} /></React.Fragment>}
				>
				</Input>
				<CSSTransition
					in={state.showCalendar}
					timeout={500}
					unmountOnExit
					classNames = "alert"
				>
					<div className='active-container'>
						<CommonLunar {...props} defaultValue={defaultValue}  onSelect={this.onSelect} />
					</div>
				</CSSTransition>
            </div>
		)
	}
}

export default FormLunar