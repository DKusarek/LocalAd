import {
    SORT_BY_CHANGED,
    SHOW_CATEGORY_PANEL,
    SORT_BY_CATEGORY_CHANGED,
    SORT_BY_LOCATION_CHANGED,
    SHOW_LOCATION_PANEL,
    CITY_NAME_CHANGED_LIST
} from '../actions/types';

const INITIAL_STATE = {
    sortBy: '',
    categoryPanel: false,
    selectedCategory: '',
    locationPanel: false,
    cityName: '',
    selectedDistance: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SORT_BY_CHANGED:
            return { ...state, sortBy: action.payload };
        case SHOW_CATEGORY_PANEL:
            return { ...state, categoryPanel: true, sortBy: '', locationPanel: false };
        case SHOW_LOCATION_PANEL:
            return { ...state, locationPanel: true, sortBy: '', categoryPanel: false };
        case SORT_BY_CATEGORY_CHANGED:
            return { ...state, 
                categoryPanel: false, 
                selectedCategory: action.payload 
            };
        case SORT_BY_LOCATION_CHANGED:
            return { ...state, 
                locationPanel: false, 
                selectedDistance: action.payload
            };
        case CITY_NAME_CHANGED_LIST:
            return { ...state, cityName: action.payload };
        default:
            return state;
    }
};
