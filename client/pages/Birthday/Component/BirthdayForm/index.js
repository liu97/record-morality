import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import LunarCal from "components/LunarCal/FormLunar";
import { message, Form, Button, Input, DatePicker, InputNumber, Radio } from 'antd';

const { TextArea } = Input;
const PREFIX = 'birthday-form';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
		addBirthdayResult: state.addBirthdayResult,
		fetchBirthdayListResult: state.fetchBirthdayListResult,
	})
)
@Form.create()
class BirthdayForm extends Component{
	constructor(props){
        super(props);
        this.state = {
            dateType: props.birthday && props.birthday.dateType || '1',
        }
	}

	componentDidMount(){

	}

	UNSAFE_componentWillReceiveProps(nextProps){
        let { fetchBirthdayListResult } = nextProps;
        if(!_.isEqual(fetchBirthdayListResult,this.props.fetchBirthdayListResult) &&fetchBirthdayListResult && fetchBirthdayListResult.isLoading === false) {
			this.setState({
                dateType:  fetchBirthdayListResult.info.data[0] && fetchBirthdayListResult.info.data[0].dateType,
            })
		}
    }
    
    goBack = () => {
		this.props.history.goBack();
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				if(values.date && values.date.solarTime){
                    values.date = values.date.solarTime.format('YYYY-MM-DD');
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
        return <span>{date.format('DD')}</span>;
    }

    dateTypeChange  = (e) => {
        this.setState({
            dateType: e.target.value,
        })
    }

	render(){
        const props = this.props;
        const state = this.state;
        const { birthday, mode, form } = props;
        const { getFieldDecorator } = form;

		const formItemLayout = {
			labelCol: {
			  xs: { span: 24 },
			  sm: { span: 8 },
			  md: { span: 8 },
			},
			wrapperCol: {
			  xs: { span: 24 },
			  sm: { span: 16 },
			  md: { span: 8 },
			},
        };
        
        let lunarConfig = {};
        state.dateType == '1' ? lunarConfig = {dateType: 'solar', placeholder: '阳历'} : lunarConfig = {dateType: 'lunar', placeholder: '阴历'}
		return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className={`${PREFIX}-form`}>
                <Form.Item label="名字">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入寿星的名字',
                        }],
                        initialValue: birthday && birthday.name,
                    })(
                        <Input disabled={mode == 'detail'}/>
                    )}
                </Form.Item>
                <Form.Item label="生日类型">
                    {getFieldDecorator('dateType', {
                        rules: [{
                            required: true, message: '请输入生日日期',
                        }],
                        initialValue: (birthday && birthday.dateType) ? birthday.dateType : "1",
                    })(
                        <Radio.Group onChange={this.dateTypeChange}>
                            <Radio value="1">阳历</Radio>
                            <Radio value="2">阴历</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item label="生日日期">
                    {getFieldDecorator('date', {
                        rules: [{
                            required: true, message: '请输入生日日期',
                        }],
                        initialValue: (birthday && birthday.date) ? moment(birthday.date) : null,
                    })(
                        <LunarCal fullscreen={false} {...lunarConfig}></LunarCal>
                    )}
                </Form.Item>
                <Form.Item label="提前提醒天数">
                    {getFieldDecorator('advanceDay', {
                        rules: [{
                            required: true, message: '请输入提前提醒天数',
                        }],
                        initialValue: (birthday && birthday.advanceDay) || 0,
                    })(
                        <InputNumber style={{width:'100%'}} disabled={mode == 'detail'} min={0}/>
                    )}
                </Form.Item>
                <Form.Item label="提醒邮箱">
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请输入正确的邮箱格式',
                        }],
                        initialValue: birthday && birthday.email,
                    })(
                        <Input placeholder="默认为你的邮箱" disabled={mode == 'detail'} />
                    )}
                </Form.Item>
                <Form.Item label="备忘录">
                    {getFieldDecorator('content', {
                        initialValue: birthday && birthday.content,
                    })(
                        <TextArea style={{minHeight: '80px'}} placeholder="你还想记点什么..." disabled={mode == 'detail'} />
                    )}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                        md: { span: 8, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit" className="submit">
                        {mode == 'edit' ? '确定' : '添加'}
                    </Button>
                    <Button onClick={this.goBack} style={{marginLeft: '16px'}}>
                        返回
                    </Button>
                </Form.Item>
            </Form>
		)
	}
}

export default withRouter(BirthdayForm)