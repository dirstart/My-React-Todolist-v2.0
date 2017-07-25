import React from 'react';
import TodoInput from './TodoInput';
import PropTypes from 'prop-types';
export default class TodoApp extends React.Component {
	static propTypes={
		
	}
    render() {
        return (<div>
        	<TodoInput />
        </div>)
    }
}