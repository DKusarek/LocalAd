import { combineReducers } from 'redux';
import AuthorizationReducer from './AuthorizationReducer';
import AdFormReducer from './AdFormReducer';
import AdReducer from './AdReducer';
import PictureReducer from './PictureReducer';
import TagReducer from './TagReducer';

export default combineReducers({
    authorization: AuthorizationReducer,
    adForm: AdFormReducer,
    ads: AdReducer,
    picture: PictureReducer,
    tags: TagReducer
});
