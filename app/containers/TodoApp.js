import React from 'react';
import TodoList from '../components/TodoList';
import DustbinList from '../components/DustbinList';
import TodoInput from '../components/TodoInput';
import PropTypes from 'prop-types';

// The real Redux is start
import { connect } from 'react-redux'
import { addTodo, initTodos,deleteTodo } from '../actions';

class TodoApp extends React.Component {
    componentWillMount() {
        this._loadLocalStorage();
    }
    _loadLocalStorage() {
        let contents = localStorage.getItem('user_contents');
        if (contents && contents.length&&contents!=='[]') {
            console.log("进入了localStorage");
            contents = JSON.parse(contents);
            this.props.initTodos(contents);
        //通过这里我们使localstorage对state里的数据起作用
        } else {
            console.log("localStorage里没有可加载的数据")
        }
    }
    handleSubmit(content) {
        // const {contents}=this.props;
        // const newContents=[...contents,content];  
        // 经过测试，这句话并不起作用
        // 符合预期，只能通过action调用state.
        // localStorage.setItem('user_contents',JSON.stringify(newContents));
        // 上面是localst自己的，下面才是store里的
        this.props.addTodo(content); //这句话是对state起作用的
    }
    handleRestore(index) {
        const {contents} = this.props;
        contents[index].flag = true;
        console.log(contents[index].content + "变成了true");
        this.setState({
            contents: contents
        }, () => {
            this._saveLocalStorage();
        })
    }
    handleDelete(index) {
        this.props.deleteTodo(index);
    }
    handleSearch(search_key) {
        console.log(search_key);
    }
    handleClearAll() {
        const {contents} = this.props;
        const new_contents = [];
        let i = 0;
        for ( let obj of contents ) {
            if (!!obj.flag) {
                console.log(obj.flag);
                obj.index = i;
                ++i;
                new_contents.push(obj);
            }
        }
        console.log(new_contents);
        this.setState({
            contents: new_contents
        }, () => {
            this._saveLocalStorage();
            console.log(contents);
        })
    }

    render() {
        const {contents} = this.props;
        console.log("render了一次");
        // localStorage.setItem('user_contents',contents);
        localStorage.setItem('user_contents', JSON.stringify(contents));
        // 如果是stringify了之后判断就不同了哈哈哈
        // 所以目前我是没有办法实现localStorage的，因为这个每次重新加载都是为空
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
                <TodoInput onSubmit={this.handleSubmit.bind(this)}
            onClearAll={this.handleClearAll.bind(this)} onSearch={this.handleSearch.bind(this)} />
                <TodoList contents={need_to_do} onHandleDelete={this.handleDelete.bind(this)}/>
                <DustbinList contents={finish} onHandleRestore={this.handleRestore.bind(this)}/>
            </div>
        )
    }
}

TodoApp.propTypes = {
    contents: PropTypes.array,
    addTodo: PropTypes.func,
    initTodos: PropTypes.func,
    deleteTodo:PropTypes.func
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
        deleteTodo:(index)=>{
            dispatch(deleteTodo(index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);