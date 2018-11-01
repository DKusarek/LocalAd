import {
    SORT_BY_CHANGED,
    SHOW_CATEGORY_PANEL,
    SORT_BY_CATEGORY_CHANGED,
    SHOW_LOCATION_PANEL
} from '../actions/types';

const INITIAL_STATE = {
    sortBy: '',
    categoryPanel: false,
    selectedCategory: '',
    locationPanel: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SORT_BY_CHANGED:
            return { ...state, sortBy: action.payload };
        case SHOW_CATEGORY_PANEL:
            return { ...state, categoryPanel: true, sortBy: '' };
        case SHOW_LOCATION_PANEL:
            return { ...state, locationPanel: true, sortBy: '' };
        case SORT_BY_CATEGORY_CHANGED:
            return { ...state, 
                categoryPanel: false, 
                selectedCategory: action.payload 
            };
        default:
            return state;
    }
};
