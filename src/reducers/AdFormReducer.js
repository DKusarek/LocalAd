import { 
    AD_UPDATE,
    AD_CREATE,
    AD_ADD_PICTURE
} from '../actions/types';

const INITIAL_STATE = { 
    title: '',
    description: '',
    category: '',
    image: null
 };

 export default (state = INITIAL_STATE, action) => {
    switch (action.type) {        
        case AD_UPDATE:
        // [] key interpolation
            return { ...state, [action.payload.prop]: action.payload.value };
        case AD_CREATE:
            return INITIAL_STATE;
        case AD_ADD_PICTURE:
            return { ...state, image: action.payload };
        default:
            return state;
    }
};
