import './index.less';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Upload, Row, Col } from 'antd';

import { requestFront } from 'utils/config';

const FormItem = Form.Item;

@Form.create()
class ArticleForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileList: props.article ? [{
        uid: +new Date(),
        // eslint-disable-next-line no-useless-escape
        name: props.article.img_path.split(/[\\\/]/).slice(-1),
        status: 'done',
        response: {message: 'defaulted', success: 1, url: props.article.img_path},
        url: `${requestFront ? requestFront : ''}/${props.article.img_path}`
      }] : []
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleSubmit(values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  changeUpload = (info) => {
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    this.setState({fileList});

    this.props.form.setFieldsValue({
      img_path: fileList[0] && fileList[0].response && fileList[0].response.url,
    });
  }
  goBack = () => {
		this.props.history.goBack();
	}
  render() {
    const { article } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
            {...formItemLayout}
            label="标题"
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
            initialValue: article && article.title,
          })(
            <Input placeholder="标题"/>
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="标签"
            extra="多个标签以，隔开"
        >
          {getFieldDecorator('tags', {
            rules: [{ required: true, message: '请输入标签!' }],
            initialValue: article && article.tags,
          })(
            <Input placeholder="多个标签以，隔开" />
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="类型"
        >
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请输入文章类型!' }],
            initialValue: article && article.type,
          })(
            <Input placeholder="文章类型" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Upload"
        >
          <Upload name="editormd-image-file" action={`${requestFront ? requestFront : ''}/admin/articles/uploadImg/`} listType="picture" fileList={this.state.fileList} onChange={this.changeUpload}>
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
          {getFieldDecorator('img_path', {
            rules: [{ required: true, message: '请上传文章封面!' }],
            initialValue: this.state.fileList[0] && this.state.fileList[0].response && this.state.fileList[0].response.url,
          })(
            <Input className="hidden-input" />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={6}></Col>
            <Col span={6} className={'col-btn'}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Col>
            <Col span={6} className={'col-btn'}>
              <Button onClick={this.goBack}>
                返回
              </Button>
            </Col>
            <Col span={6}></Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default withRouter(ArticleForm);