import React from 'react';
import Header from './Header/Header';
class TaskApp extends React.Component {
	constructor() {
		super();
		this.state = {
			contents: []
		}
	}
	render() {
		return (<div className="app-all-wrapper">
			<Header/>
		</div>)
	}
}

export default TaskApp;