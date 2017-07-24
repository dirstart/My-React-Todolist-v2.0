import React from 'react'
import ReactDOM from 'react-dom'
import {
	createStore
} from 'redux'
import {
	Provider
} from 'react-redux'
import TaskApp from './containers/TaskApp'
import taskReducer from './reducers/reducer'
import './index.css'

// const store = createStore(commentsReducer)

ReactDOM.render(
	<TaskApp />,
	document.getElementById('root')
);