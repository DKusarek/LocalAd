import { 
    AD_UPDATE,
    AD_CREATE
} from '../actions/types';

const INITIAL_STATE = { 
    title: '',
    description: '',
    category: ''
 };

 export default (state = INITIAL_STATE, action) => {
    switch (action.type) {        
        case AD_UPDATE:
        // [] key interpolation
            return { ...state, [action.payload.prop]: action.payload.value };
        case AD_CREATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};
