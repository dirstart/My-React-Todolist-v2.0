let todo_id=0;
// actions类型
export const ADD_TODO = 'ADD_TODO';
export const INIT_TODOS='INIT_TODOS';
export const DELETE_TODO='DELETE_TODO';

// action 创建函数
// 这里的index相当于是在中间层加上去的
export function addTodo(content) {
    return {
        type: ADD_TODO,
		// index:todo_id++,
        content
    }
}
export function initTodos(contents){
	return {
		type:INIT_TODOS,
		contents
	}
}
export function deleteTodo(index){
	return {
		type:DELETE_TODO,
		index
	}
}