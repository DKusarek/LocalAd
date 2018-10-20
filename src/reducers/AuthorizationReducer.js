import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    SIGN_IN_USER_SUCCESS,
    AUTH_USER_FAILED,
    LOGIN_USER,
    SIGN_IN_USER,
    PASSWORD2_CHANGED,    
    PASSWORD3_CHANGED,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    QUICK_LOG_IN
} from '../actions/types';

const INITIAL_STATE = { 
    email: '', 
    password: '', 
    password2: '', 
    password3: '',
    user: null, 
    error: '',
    signInSuccess: '',    
    changePasswordSuccess: '',
    loadingLogin: false,
    loadingSignIn: false,
    loadingChangePassword: false
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QUICK_LOG_IN:
            return { ...state, email: 'user@local.ad', password: 'password1' };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD2_CHANGED:
            return { ...state, password2: action.payload };
        case PASSWORD3_CHANGED:
            return { ...state, password3: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case SIGN_IN_USER_SUCCESS:
            return { 
                ...state, 
                ...INITIAL_STATE, 
                signInSuccess: 'Acount created. Please log in to continue' };
        case CHANGE_PASSWORD_SUCCESS:
                return { 
                    ...state, 
                    ...INITIAL_STATE, 
                    changePasswordSuccess: 'Password changed' };
        case AUTH_USER_FAILED:
            return { 
                ...state, 
                error: action.payload, 
                password: '',                 
                password2: '',             
                password3: '', 
                loadingLogin: false,
                loadingSignIn: false,
                loadingChangePassword: false
            };
        case LOGIN_USER:
            return { ...state, loadingLogin: true, error: '' };
        case SIGN_IN_USER:
            return { ...state, loadingSignIn: true, error: '' };
        case CHANGE_PASSWORD:
            return { ...state, loadingChangePassword: true, error: '' };
        default:
            return state;
    }
};
