// actions类型
export const ADD_TODO = 'ADD_TODO';
export const INIT_TODOS='INIT_TODOS';
export const TOGGLE_TODO='TOGGLE_TODO';
export const CLEAR_TODOS='CLEAR_TODOS';

// action 创建函数
export function addTodo(content) {
    return {
        type: ADD_TODO,
        content
    }
}
export function initTodos(contents){
	return {
		type:INIT_TODOS,
		contents
	}
}
export function toggleTodo(index){
	return {
		type:TOGGLE_TODO,
		index
	}
}
export function clearTodos(){
	return {
		type:CLEAR_TODOS
	}
}