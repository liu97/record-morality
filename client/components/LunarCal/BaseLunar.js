import './index.less';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import chineseLunar from 'chinese-lunar';
import { Calendar   } from 'antd';

const PREFIX = 'base-lunar';

class BaseLunar extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	UNSAFE_componentWillReceiveProps(nextProps){

    }
	
	// 追加阴历内容
    dateCellRender = (date) => {
		let lunarDate = chineseLunar.solarToLunar(new Date(date.format('YYYY-MM-DD 00:00:00')));
		let lunarValue = lunarDate.day == 1 ? 
							chineseLunar.monthName(lunarDate.month, true, lunarDate.leap).slice(0,2) 
							: chineseLunar.dayName(lunarDate.day);
        return <span className="ant-fullcalendar-value">{lunarValue}</span>;
	}
	
	// 在select value里添加阴历
	onSelect = (date) => {
		date = this.formatDateValue(date)

		this.props.onSelect && this.props.onSelect(date);
	}
	
	formatDateValue = (date) => {
		if(!date){
			return null;
		}
		else if(date.lunarDate){
			return date;
		}
		else if(date._isAMomentObject){
			let solarDate = date;
			let lunarDate = chineseLunar.solarToLunar(new Date(solarDate.format('YYYY-MM-DD 00:00:00')));
			let tradition = chineseLunar.format(lunarDate, 'T(A)Md');
			lunarDate.dateValue = `${solarDate.format('YYYY-MM-DD')} ${tradition}`;
			return {lunarDate, solarDate};
		}
		else{
			let lunarDate = date;
			let commonDate = chineseLunar.lunarToSolar(lunarDate);
			let solarDate = moment(commonDate);
			let tradition = chineseLunar.format(lunarDate, 'T(A)Md');
			lunarDate.dateValue = `${solarDate.format('YYYY-MM-DD')} ${tradition}`;

			return {lunarDate, solarDate};
		}
	}

	render(){
		const props = this.props;
		const style = props.style;
		const calClass = classNames({
            [props.className]: props.className != undefined,
			[PREFIX]: true,
			'ant-fullcalendar-nofull': !props.fullscreen,
		});
		const defaultValue = this.formatDateValue(props.defaultValue);
		const value = this.formatDateValue(props.value);
		const dateValue = {
			defaultValue: defaultValue && defaultValue.solarDate,
			value: value && value.solarDate,
		}
		for(let item of Object.keys(dateValue)){
			if(dateValue[item] == undefined){
				delete dateValue[item];
			}
		}
		return (
            <div className={calClass} style={style}>
                <Calendar {...props} className='' {...dateValue} style={{}} dateCellRender={this.dateCellRender} onSelect={this.onSelect} />
            </div>
		)
	}
}

export default BaseLunar