import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import chineseLunar from 'chinese-lunar';
import { message, Form, Button, Input, DatePicker, InputNumber, Calendar   } from 'antd';

const { TextArea } = Input;
const PREFIX = 'lunar-cal';

class LunarCal extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	UNSAFE_componentWillReceiveProps(nextProps){

    }
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if(values.date){
					values.date = values.date.format('YYYY-MM-DD');
				}

				for(let key of Object.keys(values)){
					if(values[key] == undefined){
						delete values[key];
					}
				}
                this.props.handleSubmit && this.props.handleSubmit(values);
				console.log('Received values of form: ', values);
			}
		});
    }
    
    dateCellRender = (date) => {
		let lunarTime = chineseLunar.solarToLunar(new Date(date.format('YYYY-MM-DD 00:00:00')));
		let lunarValue = lunarTime.day == 1 ? chineseLunar.monthName(lunarTime.month, true, lunarTime.leap) : chineseLunar.dayName(lunarTime.day);
        return <span className="ant-fullcalendar-value">{lunarValue}</span>;
    }

	render(){

		return (
            <div className={PREFIX}>
                <Calendar fullscreen={false} dateCellRender={this.dateCellRender} />
            </div>
		)
	}
}

export default withRouter(LunarCal)