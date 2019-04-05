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
			inputValue: this.formatDate(props.defaultValue || props.value),
			dateValue: props.defaultValue || props.value,
		}

		this.dRenderSub = _.debounce(this.renderSub);
	}

	componentDidMount(){
		document.addEventListener("click", this.hideCal);

		window.addEventListener("resize", this.showCal);
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		let { value } = nextProps;
		if(value !== this.props.value && value) {
			this.setState({
				dateValue: value,
			})
		}
	}

	componentDidUpdate(){
		this.dRenderSub();
	}

	componentWillUnmount(){
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
		if(!this.matchesSelector(e.target,'.form-lunar *')){ //匹配当前组件内的所有元素
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
			showCalendar: false,
			inputValue,
			dateValue: date,
		});

		this.props.onChange && this.props.onChange(date);

		this.props.onSelect && this.props.onSelect(date);
	}

	getLunar = () => { // 返回
		const props = _.cloneDeep(this.props);
		const state = this.state;
		const defaultValue = state.dateValue && state.dateValue.solarTime;
		const lunarClass = classNames({
			'active-lunar': true,
		});

		const dClinetHeight = document.documentElement.clientHeight; // 视窗口高度
		const dClinetWidth = document.documentElement.clientWidth; // 视窗口宽度
		const iRect = this.iEvent.currentTarget.getBoundingClientRect();
		iRect.toBottom = dClinetHeight - iRect.bottom; // 输入框距浏览器窗口底部距离
		iRect.toRight = dClinetWidth - iRect.left; // 输入框左端距浏览器窗口右部距离
		let lunarHeight = 321;
		let lunarWidth = 300;
		let lunarStyle = {};
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
				<BaseLunar {...props} style={lunarStyle} className={lunarClass} fullscreen={false} defaultValue={defaultValue}  onSelect={this.onSelect} />
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