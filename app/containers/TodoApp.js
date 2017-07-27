import React from 'react';
import TodoList from '../components/TodoList';
import DustbinList from '../components/DustbinList';
import TodoInput from '../components/TodoInput';
import PropTypes from 'prop-types';

// The real Redux is start
import { connect } from 'react-redux'
import { addTodo, initTodos,toggleTodo,clearTodos } from '../actions';

class TodoApp extends React.Component {
    componentWillMount() {
        this._loadLocalStorage();
    }
    _loadLocalStorage() {
        let contents = localStorage.getItem('user_contents');
        if (contents && contents.length && contents !== '[]') {
            console.log("进入了localStorage");
            contents = JSON.parse(contents);
            this.props.initTodos(contents);
        } else {
            console.log("localStorage里没有可加载的数据")
        }
    }
    handleSearch(search_key) {
        console.log(search_key);
    }
    handleClearAll() {
        const {contents} = this.props;
        const new_contents = [];
    }

    render() {
        const {contents} = this.props;
        console.log("render了一次");
        localStorage.setItem('user_contents', JSON.stringify(contents));
        let need_to_do = [];
        let finish = [];
        for ( let obj of contents ) {
            if (obj.flag === true) {
                need_to_do.push(obj);
            } else {
                finish.push(obj);
            }
        }

        return (
            <div className="app-all-wrapper">
                <TodoInput onSubmit={(content)=>{this.props.addTodo(content)}}
            onClearAll={()=>this.props.clearTodos()}
            onSearch={this.handleSearch.bind(this)} />
                <TodoList contents={need_to_do} onHandleDelete={index=>this.props.toggleTodo(index)}/>
                <DustbinList contents={finish} onHandleRestore={index=>this.props.toggleTodo(index)}/>
            </div>
        )
    }
}

TodoApp.propTypes = {
    contents: PropTypes.array,
    addTodo: PropTypes.func,
    initTodos: PropTypes.func,
    toggleTodo:PropTypes.func,
    clearTodos:PropTypes.func
}
// 通过这句话将content传给this.props用来代替原来的state
const mapStateToProps = (state) => {
    return {
        contents: state.contents
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (content) => {
            dispatch(addTodo(content));
        },
        initTodos: (contents) => {
            dispatch(initTodos(contents));
        },
        toggleTodo:(index)=>{
            dispatch(toggleTodo(index));
        },
        clearTodos:()=>{
            dispatch(clearTodos());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);