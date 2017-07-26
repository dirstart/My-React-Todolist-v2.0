import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './index.css'
import TodoApp from './containers/TodoApp'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todo_reducer from './reducers';

const store = createStore(todo_reducer);

ReactDOM.render(
    <Provider store={store}>
		<TodoApp/>
	</Provider>,
    document.getElementById('root')
);