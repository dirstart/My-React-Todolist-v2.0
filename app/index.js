import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './index.css'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import TodoApp from './containers/TodoApp'
// import todoReducer from './reducers/store'

// const store = createStore(todoReducer);

ReactDOM.render(
	<TodoApp/>,
	document.getElementById('root')
);