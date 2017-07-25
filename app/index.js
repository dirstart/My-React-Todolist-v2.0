import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TodoApp from './containers/TodoApp'
import todoReducer from './reducers/store'

const store = createStore(todoReducer);

ReactDOM.render(
	<Provider store={store}>
			<TodoApp />
	</Provider>,
	document.getElementById('root')
);