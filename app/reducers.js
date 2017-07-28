import { ADD_TODO, INIT_TODOS, TOGGLE_TODO, CLEAR_TODOS } from './actions';
let tem = localStorage.getItem('id'),
    todo_index = (tem !== null) ? tem : 0;
const save = () => {
    localStorage.setItem('id', todo_index);
}
const set_save = (tem) => {
    localStorage.setItem('id', tem);
}

function todo_reducer(state, action) {
    if (!state) {
        state = {
            contents: []
        }
    }
    switch (action.type) {
    case ADD_TODO:
        save();
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
    case CLEAR_TODOS:
        todo_index = tem = 0;
        state.contents.map(obj => obj.flag === true && todo_index++);
        set_save(tem - 1);
        return {
            contents: state.contents.filter(obj => obj.flag).map(obj => {
                return Object.assign({}, obj, {
                    index: todo_index++
                })
            })
        }
    default:
        return state;
    }
}

export default todo_reducer;