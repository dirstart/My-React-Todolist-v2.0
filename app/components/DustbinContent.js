import React from 'react';
import PropTypes from 'prop-types';

export default class DustbinContent extends React.Component {
    static defaultProps = {
        content: ''
    }
    handleRestore() {
        if (this.props.onHandleRestore) {
            this.props.onHandleRestore(this.props.index);
        }
    }
    render() {
        return (<div className="dustbin-content-wrapper">
			<div className="dustbin-content">{this.props.content}</div>
			<span className="dustbin-restore" onClick={this.handleRestore.bind(this)}>还原</span>
		</div>)
    }
}

DustbinContent.propTypes = {
    content: PropTypes.string,
    onRestore: PropTypes.func
}