import {
    TAG_ADD,
    TAG_NAME_CHANGED,
    TAG_DELETE
    
} from '../actions/types';

const INITIAL_STATE = {
    tags: [], 
    tagName: '',
    deleted: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAG_ADD:
            if (state.tags.indexOf(action.payload) === -1) {
                state.tags.push(action.payload);
            }
            return { ...state, tagName: '' };
        case TAG_DELETE:
            if (state.tags.indexOf(action.payload) > -1) {
                state.tags.splice(state.tags.indexOf(action.payload), 1);
            }
            return { ...state, tagName: '', deleted: action.payload };
        case TAG_NAME_CHANGED:
            return { ...state, tagName: action.payload };
        default:
            return state;
    }
};
