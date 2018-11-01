import {
    ADS_FETCH_SUCCESS,
    ADS_CHANGED_ORDER,
    ADS_TO_EDIT_FETCH_SUCCESS,
    FILTER_ADS,
    SEARCH_EMPTY
} from '../actions/types';

const INITIAL_STATE = {
    ads: {},
    originalAds: {},
    adsToEdit: {},
    filteredAds: {},
    searchText: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADS_FETCH_SUCCESS:
            return { ...state, ads: action.payload, originalAds: action.payload };
        case ADS_TO_EDIT_FETCH_SUCCESS:
            return { ...state, adsToEdit: action.payload };
        case FILTER_ADS:
            return { ...state, filteredAds: action.payload, searchText: true }; 
        case SEARCH_EMPTY: 
            return { ...state, filteredAds: {}, searchText: false };          
        case ADS_CHANGED_ORDER:
            return { ...state, ads: action.payload };
        default:
            return state;
    }
};
