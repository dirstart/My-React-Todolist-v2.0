// action types
let INIT_CONTENTS = 'INIT_CONTENTS',
    ADD_CONTENT = 'ADD_CONTENT',
    DELETE_CONTENT = 'DELETE_CONTENT',
    RESTORE_CONTENT = 'RESTORE_CONTENT';

// action creators
export const addContent = (content) => {
    return {
        type: ADD_CONTENT,
        content
    }
}
export const initContents = (contents) => {
    return {
        type: INIT_CONTENTS,
        contents
    }
}
export const deleteContent = (content_index) => {
    return {
        type: DELETE_CONTENT,
        content_index
    }
}

// reducer
export default function(state, action) {
    if (!state) {
        state = {
            contents: []
        }
    }
    switch (action.type) {
    case INIT_CONTENTS:
        return {
            contents: action.contents
        }
    case ADD_CONTENT:
        return {
            contents: [...state.contents, action.content]
        }
    case DELETE_CONTENT:
        return {
            contents: [...state.contents.slice(0, action.content_index),
                ...state.contents.slice(action.content_index + 1)
            ]
        }
    default:
        return state
    }
}