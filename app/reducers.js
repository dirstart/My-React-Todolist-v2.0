import { ADD_TODO } from './actions';

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
    default:
        return state;
    }
}

export default todo_reducer;