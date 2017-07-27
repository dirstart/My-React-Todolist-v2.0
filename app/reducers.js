import { ADD_TODO, INIT_TODOS } from './actions';
let todo_index=0;
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
					content:action.content,
					flag:true,
					index:todo_index++
				}]
			}
		case INIT_TODOS:
			return {
				contents: action.contents
			}
		default:
			return state;
	}
}

export default todo_reducer;