import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import ContentList from '../Component/ContentList';
import NoteContent from '../Component/NoteContent';

const PREFIX = 'note-content';

@connect(
	// eslint-disable-next-line no-unused-vars
	(state, props) => ({
	})
)
class Content extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <React.Fragment>
            <ContentList  
                className={`${PREFIX}-list`} 
                {...this.props}
            />
            <NoteContent 
                className={`${PREFIX}-content`}
                getNoteList={this.props.getNoteList}
            >
            </NoteContent>
        </React.Fragment>
    )
  }
}

export default Content