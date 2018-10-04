import {
    ADS_FETCH_SUCCESS,
    ADS_CHANGED_ORDER,
    ADS_TO_EDIT_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    ads: {},
    originalAds: {},
    adsToEdit: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADS_FETCH_SUCCESS:
            return { ads: action.payload, originalAds: action.payload };
        case ADS_TO_EDIT_FETCH_SUCCESS:
            return { ...state, adsToEdit: action.payload };
        case ADS_CHANGED_ORDER:
            return { ...state, ads: action.payload };
        default:
            return state;
    }
};
