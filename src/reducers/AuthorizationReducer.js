import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    SIGN_IN_USER_SUCCESS,
    AUTH_USER_FAILED,
    LOGIN_USER,
    SIGN_IN_USER
} from '../actions/types';

const INITIAL_STATE = { 
    email: '', 
    password: '', 
    user: null, 
    error: '',
    signInSuccess: '',
    loadingLogin: false,
    loadingSignIn: false
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case SIGN_IN_USER_SUCCESS:
            return { 
                ...state, 
                ...INITIAL_STATE, 
                signInSuccess: 'Acount created. Please log in to continue' };
        case AUTH_USER_FAILED:
            return { 
                ...state, 
                error: action.payload, 
                password: '', 
                loadingLogin: false,
                loadingSignIn: false 
            };
        case LOGIN_USER:
            return { ...state, loadingLogin: true, error: '' };
        case SIGN_IN_USER:
            return { ...state, loadingSignIn: true, error: '' };
        default:
            return state;
    }
};
