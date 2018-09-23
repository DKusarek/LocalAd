import {
    ADS_FETCH_SUCCESS
    
} from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADS_FETCH_SUCCESS:
            return action.payload;
        // case ADS_FETCH_PICTURE_SUCCESS:
        //     return { ...state, image: action.payload };
        default:
            return state;
    }
};
