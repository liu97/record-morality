import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import chineseLunar from 'chinese-lunar';
import { message, Form, Button, Input, DatePicker, InputNumber, Calendar   } from 'antd';

const { TextArea } = Input;
const PREFIX = 'common-lunar';

class CommonLunar extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	UNSAFE_componentWillReceiveProps(nextProps){

    }
	
	// 追加阴历内容
    dateCellRender = (date) => {
		let lunarTime = chineseLunar.solarToLunar(new Date(date.format('YYYY-MM-DD 00:00:00')));
		let lunarValue = lunarTime.day == 1 ? 
							chineseLunar.monthName(lunarTime.month, true, lunarTime.leap).slice(0,2) 
							: chineseLunar.dayName(lunarTime.day);
        return <span className="ant-fullcalendar-value">{lunarValue}</span>;
	}
	
	// 在select value里添加阴历
	onSelect = (date) => {
		let lunarTime = chineseLunar.solarToLunar(new Date(date.format('YYYY-MM-DD 00:00:00')));
		lunarTime.dateValue = `${lunarTime.year}-${lunarTime.month}-${lunarTime.day}`;

		this.props.onSelect && this.props.onSelect({lunarTime, solarTime: date});
    }

	render(){
		const props = this.props;
		const calClass = classNames({
            [props.className]: props.className != undefined,
			[PREFIX]: true,
			'ant-fullcalendar-nofull': !props.fullscreen,
		});
		return (
            <div className={calClass}>
                <Calendar {...props} dateCellRender={this.dateCellRender} onSelect={this.onSelect} />
            </div>
		)
	}
}

export default CommonLunar