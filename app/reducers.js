import { ADD_TODO, INIT_TODOS,TOGGLE_TODO } from './actions';
let todo_index = 0;
function todo_reducer(state, action) {
    if (!state) {
        state = {
            contents: []
        }
    }
    switch (action.type) {
    case ADD_TODO:
        return {
            contents: [...state.contents, {
                content: action.content,
                flag: true,
                index: todo_index++
            }]
        }
    case INIT_TODOS:
        return {
            contents: action.contents
        }
    case TOGGLE_TODO:
        return {
            contents: [...state.contents.slice(0, action.index),
                Object.assign({}, state.contents[action.index], {
                    flag: !state.contents[action.index].flag
                }),
                ...state.contents.slice(action.index + 1)
            ]
        }  	
    default:
        return state;
    }
}

export default todo_reducer;