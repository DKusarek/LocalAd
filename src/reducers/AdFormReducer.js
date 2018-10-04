import { 
    AD_UPDATE,
    AD_CREATE,
    AD_ADD_PICTURE,
    AD_TAG_ADD,
    AD_TAG_DELETE,
    GET_DEFAULT_IMAGE,
    AD_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
    title: '',
    description: '',
    category: '',
    image: null,
    tags: []
 };

 export default (state = INITIAL_STATE, action) => {
    switch (action.type) {        
        case AD_UPDATE:
        // [] key interpolation
            return { ...state, [action.payload.prop]: action.payload.value };
        case AD_CREATE:
            return INITIAL_STATE;
        case AD_SAVE_SUCCESS:
            return INITIAL_STATE;
        case AD_ADD_PICTURE:
            return { ...state, image: action.payload };
        case GET_DEFAULT_IMAGE:
            return { ...state, image: action.payload };
        case AD_TAG_ADD:
            if (state.tags.indexOf(action.payload) === -1) {
                state.tags.push(action.payload);
            }
            return { ...state };
        case AD_TAG_DELETE:
            if (state.tags.indexOf(action.payload) > -1) {
                state.tags.splice(state.tags.indexOf(action.payload), 1);
            }
            return { ...state };
        default:
            return state;
    }
};
