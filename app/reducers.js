import { ADD_TODO,INIT_TODOS } from './actions';

function todo_reducer(state, action) {
    if (!state) {
        state = {
            contents: []
        }
    }
    switch (action.type) {
    case ADD_TODO:
        return {
            contents: [...state.contents, action.content]
        }
    case INIT_TODOS:
    	return {
    		contents:action.contents
    	}
    default:
        return state;
    }
}

export default todo_reducer;