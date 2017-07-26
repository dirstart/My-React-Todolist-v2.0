import React from 'react';
import TodoContent from './TodoContent';
import PropTypes from 'prop-types';
export default class TodoList extends React.Component {
	static defaultProps = {
		contents: []
	}
	handleDelete(index) {
		if (this.props.onHandleDelete) {
			this.props.onHandleDelete(index);
		} else {
			console.log("TodoList 没有onHandleDelete");
		}
	}
	render() {
		return (<div className="list-all-wrapper">
		{
			this.props.contents.map((obj,i)=>{
				return <TodoContent  content={obj.content} key={i} index={obj.index} 
				onHandleDelete={this.handleDelete.bind(this)}/>
			})
		}
		</div>)
	}
}

TodoList.PropTypes = {
	contents: PropTypes.array,
	onHandleDelete: PropTypes.func
}