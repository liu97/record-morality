import './index.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, DatePicker } from 'antd';
import classNames from 'classnames';

const { RangePicker } = DatePicker;

@Form.create()
class ContentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            navList: this.props.navList,
            selectedKeys: [],
        }
		
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { navList } = nextProps;
        if(navList && !_.isEqual(navList, this.props.navList)){
            this.setState({
                navList
            })
        }
    }

    componentDidMount(){
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {

                const rangeValue = fieldsValue['createdAt'];

                const values = {
                    ...fieldsValue,
                    'createdAt': rangeValue && [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
                }
                console.log('Received values of form: ', values);
            }
        });
    }

    getForm = () => {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="search-form">
                <Form.Item>
                    {getFieldDecorator('name')(
                        <Input placeholder="笔记名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('createdAt')(
                        <RangePicker/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        查询
                    </Button>
                </Form.Item>
            </Form>
        )
    }
	render(){
        const props = this.props;
        const contentListClass = classNames({
            [props.className]: props.className != undefined,
            'content-list': true
        })
		return (
            <div
                className={contentListClass}
            >
                {this.getForm()}
            </div>
		)
	}
}

export default ContentList;