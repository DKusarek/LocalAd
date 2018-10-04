import {
    ADS_FETCH_SUCCESS,
    ADS_CHANGED_ORDER
    
} from '../actions/types';

const INITIAL_STATE = {
    
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload);
    switch (action.type) {
        case ADS_FETCH_SUCCESS:
            return action.payload;
        case ADS_CHANGED_ORDER:
            return action.payload;
        default:
            return state;
    }
};
