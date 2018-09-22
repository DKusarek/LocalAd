import { combineReducers } from 'redux';
import AuthorizationReducer from './AuthorizationReducer';
import AdFormReducer from './AdFormReducer';

export default combineReducers({
    authorization: AuthorizationReducer,
    adForm: AdFormReducer
});
