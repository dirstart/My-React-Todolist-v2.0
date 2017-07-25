import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoInput from '../components/TodoInput';
import { addContent } from '../reducers/store';

class TodoInputContainer extends React.Component {
    static propTypes ={
        contents:PropTypes.array,
        onSubmit: PropTypes.func,
        onClearAll: PropTypes.func,
        onSearch:PropTypes.func
    }
    handleSubmitContent(obj) {
        const {contents}=this.props;
        const newContents=[...contents,obj];
        localStorage.setItem('contents',JSON.stringify(newContents));
        if(this.props.onSubmit){
            this.PropTypes.onSubmit(obj);
        }
    }
    handleClearAllContent() {
        console.log('clear');
    }
    handleSearchContent(){
        console.log('search');
    }
    render() {
        return (<TodoInput
            onSubmit={this.handleSubmitContent.bind(this)}
            onClearAll={this.handleClearAllContent.bind(this)} 
            onSearch={this.handleSearchContent.bind(this)} />)
    }

}
const mapStateToProps=(state)=>{
    return{
        contents:state.contents
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onSubmit:(content)=>{
            dispatch(addContent);
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoInputContainer);