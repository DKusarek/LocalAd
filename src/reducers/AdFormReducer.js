import { 
    AD_UPDATE,
    AD_CREATE,
    AD_ADD_PICTURE,
    AD_TAG_ADD,
    AD_TAG_DELETE,
    GET_DEFAULT_IMAGE,
    AD_SAVE_SUCCESS,
    SET_MARKER_LOCATION,
    CLEAR_AD_FORM
} from '../actions/types';

const INITIAL_STATE = { 
    title: '',
    description: '',
    category: '',
    image: null,
    tags: [],
    location: {}
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
        case SET_MARKER_LOCATION:
            return { ...state, location: action.payload };
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
        case CLEAR_AD_FORM:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
};
