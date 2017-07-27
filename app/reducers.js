import { ADD_TODO, INIT_TODOS,TOGGLE_TODO,CLEAR_TODOS } from './actions';
let todo_index = 0;
function todo_reducer(state, action) {
    if (!state) {
        state = {
            contents: []
            // todo_index:0
        }
    }
    switch (action.type) {
    case ADD_TODO:
    	console.log(todo_index);
        return {
            contents: [...state.contents, {
                content: action.content,
                flag: true,
                index: todo_index++
            }]
        }
    case INIT_TODOS:
    	console.log(todo_index);
        return {
            contents: action.contents
        }
    case TOGGLE_TODO:
    	console.log(todo_index);
        return {
            contents: [...state.contents.slice(0, action.index),
                Object.assign({}, state.contents[action.index], {
                    flag: !state.contents[action.index].flag
                }),
                ...state.contents.slice(action.index + 1)
            ]
        }
    case CLEAR_TODOS:
    	todo_index=0;
    	console.log(todo_index);
    	return {
			contents:state.contents.filter(obj=>obj.flag).map(obj=>{
				console.log(todo_index)
				return Object.assign({},obj,{index:todo_index++})
			})
    	}
    default:
        return state;
    }
}

export default todo_reducer;