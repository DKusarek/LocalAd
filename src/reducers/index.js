import { combineReducers } from 'redux';
import AuthorizationReducer from './AuthorizationReducer';

export default combineReducers({
    authorization: AuthorizationReducer
});
