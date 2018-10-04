import {
    ADS_FETCH_PICTURE_SUCCESS,
    UPDATE_PICTURE    
} from '../actions/types';

const INITIAL_STATE = {
    image: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADS_FETCH_PICTURE_SUCCESS:
            state.image.push(action.payload);
            return { ...state };
        case UPDATE_PICTURE:
            const oldState = state.image.filter((image) => 
                image.adUuid === action.payload.adUuid
                );
            if (oldState[0] !== undefined) {
                oldState[0].url = action.payload.url;
            } else {
                state.image.push(action.payload);
            }            
            return { ...state };
        default:
            return state;
    }
};
