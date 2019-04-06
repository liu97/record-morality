import './index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { Input, Icon } from 'antd';
import chineseLunar from 'chinese-lunar';
import BaseLunar from './BaseLunar';
import moment from 'moment';
const PREFIX = 'form-lunar';

class FormLunar extends Component{
	constructor(props){
		super(props);
		this.state = {
			showCalendar: false,
			inputValue: this.formatInputValue(props.defaultValue || props.value),
			dateValue: this.formatDateValue(props.defaultValue || props.value),
		}

		this.dRenderSub = _.debounce(this.renderSub);
	}

	componentDidMount(){
		this.state.dateValue && this.props.onChange && this.props.onChange(this.state.dateValue);

		document.addEventListener("click", this.hideCal);

		window.addEventListener("resize", this.showCal);
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		let { value, dateType } = nextProps;
		if((value !== this.props.value) || (dateType !== this.props.dateType)) { // 如果改变了日期或者日历类型
			value = this.formatDateValue(value);
			this.setState({
				dateValue: value,
				inputValue: this.formatInputValue(value, dateType),
			})
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(!_.isEqual(prevState.dateValue, this.state.dateValue) || this.state.showCalendar) {
			this.dRenderSub();
		}
	}

	componentWillUnmount(){
		this.conDiv && this.conDiv.parentNode.removeChild(this.conDiv);
		document.removeEventListener('click', this.hideCal);

		document.removeEventListener('resize', this.showCal);
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

	renderSub = () => { // 渲染子组件lunar
		ReactDOM.unstable_renderSubtreeIntoContainer(
			this,
			this.getLunar(),
			this.getLunarContainer(),
		)
	}
	
	hideCal = (e) => {
		if(!this.matchesSelector(e.target,'.mask-lunar-container *')
			&& !this.matchesSelector(e.target,'.form-lunar *')
			&& this.state.showCalendar){ //匹配当前组件内的所有元素
			this.setState({
				showCalendar: false,
			})
		}
	}

	showCal = (e) => {
		if(this.state.showCalendar){
			this.dRenderSub();
		}
	}

	formatDateValue = (date) => {
		if(!date){
			return null;
		}
		else if(date.lunarTime){
			return date;
		}
		else if(date._isAMomentObject){
			let solarTime = date;
			let lunarTime = chineseLunar.solarToLunar(new Date(solarTime.format('YYYY-MM-DD 00:00:00')));
			let tradition = chineseLunar.format(lunarTime, 'T(A)Md');
			lunarTime.dateValue = `${solarTime.format('YYYY-MM-DD')} ${tradition}`;
			return {lunarTime, solarTime};
		}
		else{
			let lunarTime = date;
			let commonDate = chineseLunar.lunarToSolar(lunarTime);
			let solarTime = moment(commonDate);
			let tradition = chineseLunar.format(lunarTime, 'T(A)Md');
			lunarTime.dateValue = `${solarTime.format('YYYY-MM-DD')} ${tradition}`;

			return {lunarTime, solarTime};
		}
	}

	formatInputValue = (date, dateType) => { // 根据类型格式化日期
		const props = this.props;
		!dateType && (dateType = props.dateType);
		let inputValue = null;
		let dateValue = this.formatDateValue(date);
		if(date){
			if(dateType == 'solar'){ // 如果是阳历类型
				inputValue = dateValue.solarTime.format('YYYY-MM-DD');
			}
			else{
				inputValue = dateValue.lunarTime.dateValue
			}
		}
		return inputValue;
	}
	
	onSelect = (date) => { // 点击选择日期回调
		let inputValue = this.formatInputValue(date);
		let dateValue = this.formatDateValue(date);

		this.selectedDate = date;
		this.setState({
			showCalendar: false,
			inputValue,
			dateValue,
		});

		this.props.onChange && this.props.onChange(date);

		this.props.onSelect && this.props.onSelect(date);
	}

	getLunar = () => { // 返回日历组件
		const props = _.cloneDeep(this.props);
		const state = this.state;
		const lunarClass = classNames({
			'active-lunar': true,
		});
		let lunarStyle = {};

		if(this.iEvent){
			const dClinetHeight = document.documentElement.clientHeight; // 视窗口高度
			const dClinetWidth = document.documentElement.clientWidth; // 视窗口宽度
			const iRect = this.iEvent.currentTarget.getBoundingClientRect();
			iRect.toBottom = dClinetHeight - iRect.bottom; // 输入框距浏览器窗口底部距离
			iRect.toRight = dClinetWidth - iRect.left; // 输入框左端距浏览器窗口右部距离
			let lunarHeight = 321;
			let lunarWidth = 300;
			if(iRect.toBottom < lunarHeight){
				if(iRect.top < lunarHeight){
					lunarStyle.top = 0;
				}
				else{
					lunarStyle.top = iRect.top-lunarHeight;
				}
			}
			else{
				lunarStyle.top = iRect.bottom;
			}
			if(iRect.toRight < lunarWidth){
				lunarStyle.right = 0;
			}
			else{
				lunarStyle.left = iRect.left;
			}
		}

		delete props.className;
		delete props.onSelect;
		delete props.onChange;
		delete props.value;
		delete props.id;
		return (
			<CSSTransition
				in={state.showCalendar}
				timeout={500}
				unmountOnExit
				classNames = "alert"
			>
				<BaseLunar {...props} style={lunarStyle} className={lunarClass} fullscreen={false} defaultValue={state.dateValue && state.dateValue.solarTime}  onSelect={this.onSelect} />
			</CSSTransition>
		)
	}

	getLunarContainer = () => {
		if(!this.conDiv){
			this.conDiv = document.createElement('div');
			this.conDiv.setAttribute('class', 'mask-lunar-container')
			document.body.appendChild(this.conDiv);
		}
		return this.conDiv;
	}
	
	handleInputClick = (event) => {
		this.iEvent = _.cloneDeep(event);
		
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
		const props = this.props;
		const state = this.state;
		const calClass = classNames({
            [props.className]: props.className != undefined,
			[PREFIX]: true,
			'lunar-have-value': state.inputValue,
		});
		
		return (
            <div className={calClass}>
				<Input 
					value={state.inputValue} 
					onClick={this.handleInputClick} 
					onBlur={this.handleInputBlur} 
					className='active-input'
					placeholder={props.placeholder}
					suffix={<React.Fragment>
						<Icon type="calendar" />
						{state.inputValue && <Icon type="close-circle" theme="filled" onClick={this.handleClear} />}
						</React.Fragment>}
				>
				</Input>
            </div>
		)
	}
}

export default FormLunar