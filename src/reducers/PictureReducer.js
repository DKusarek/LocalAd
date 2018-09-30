import {
    ADS_FETCH_PICTURE_SUCCESS
    
} from '../actions/types';

const INITIAL_STATE = {
    image: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADS_FETCH_PICTURE_SUCCESS:
        state.image.push(action.payload);
            return { ...state };
        default:
            return state;
    }
};
