import React from 'react';
import PropTypes from 'prop-types';
export default class TodoContent extends React.Component {
    static defaultProps = {
        content: ''
    }
    HandleDelete() {
        if (this.props.onHandleDelete) {
            this.props.onHandleDelete(this.props.index);
        } else {
            console.log("没有onHandleDelete");
        }
    }
    render() {
        return (<div className="list-content-wrapper" >
			<div className="list-content">{this.props.content}</div>
			<span className="list-delete" onClick={this.HandleDelete.bind(this)}
            >删除</span>
		</div>)
    }
}
TodoContent.PropTypes = {
    content: PropTypes.string,
    onHandleDelete: PropTypes.func
}