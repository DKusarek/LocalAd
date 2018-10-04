import {
    SORT_BY_CHANGED,
    SHOW_CATEGORY_PANEL
    
} from '../actions/types';

const INITIAL_STATE = {
    sortBy: '',
    categoryPanel: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SORT_BY_CHANGED:
            return { ...state, sortBy: action.payload };
        case SHOW_CATEGORY_PANEL:
            return { ...state, categoryPanel: true };
        default:
            return state;
    }
};
