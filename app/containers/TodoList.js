import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoList from '../components/TodoList';
import { initContents } from '../reducers/store';

class TodoListContainer extends React.Component {
    static propTypes = {
        contents: PropTypes.array,
        initContents: PropTypes.func,
        onDeleteContent: PropTypes.func
    }
    componentWillMount() {
        this._loadContents();
    }
    _loadContents() {
        let contents = localStorage.getItem('contents');
        contents = contents ? JSON.parse(contents) : [];
        this.props.initContents(contents);
    }
    handleDelete(index) {
        const {contents} = this.props;
        const newContents = [
            ...contents.slice(0, index),
            ...contents.slice(index + 1)
        ]
        localStorage.setItem('contents', JSON.stringify(newContents));
        if (this.props.onDeleteContent) {
            this.props.onDeleteContent(index);
        } else {
            console.log("TodoList 没有onDeleteContent");
        }
    }

    render() {
        return (<TodoList
            contents={this.props.contents}
            onDeleteContent={this.handleDelete.bind(this)}
            />)
    }
}

const mapStateToProps = (state) => {
	return {
		contents: state.contents
	}
}

const mapDispatchToProps = (dispatch) {
	return {
		initContents: (contents) => {
			dispatch(initContents(contents));
		},
		onDeleteContent: (content_index) => {
			dispatch(deleteContent(content_index));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);