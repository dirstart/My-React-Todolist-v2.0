import React from 'react';
import PropTypes from 'prop-types';
class TodoContent extends React.Component {
    static propTypes = {
        content: PropTypes.string,
        onDeleteContent: PropTypes.func
    }
    static defaultProps = {
        content: ''
    }
    HandleDelete() {
        if (this.props.onDeleteContent) {
            this.props.onDeleteContent(this.props.index);
        } else {
            console.log("没有onDeleteContent");
        }
    }
    componentWillMount() {
        // console.log("我被调用了");
    }
    render() {
        return (
            <div className="list-content-wrapper" >
				<div className="list-content">{this.props.content}</div>
				<span className="list-delete" onClick={this.HandleDelete.bind(this)}>删除</span>
			</div>
        )
    }
}

export default TodoContent;