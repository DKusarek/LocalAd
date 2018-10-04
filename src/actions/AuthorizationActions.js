import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    AUTH_USER_FAILED,
    LOGIN_USER,
    SIGN_IN_USER,
    SIGN_IN_USER_SUCCESS,
    PASSWORD2_CHANGED
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const password2Changed = (text) => {
    return {
        type: PASSWORD2_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch((error) => {
            console.log(error);
            authUserFailed(dispatch, error.message);
        });
    };
};

export const signInUser = ({ email, password, password2 }) => {
    return (dispatch) => {
        dispatch({ type: SIGN_IN_USER });
        if (password !== password2) {
            authUserFailed(dispatch, 'Given passwords are not identical');
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => signInUserSuccess(dispatch))
                .catch((error) => {
                    console.log(error);
                    authUserFailed(dispatch, error.message);
                });
        }
    };
};

const authUserFailed = (dispatch, message) => {
    dispatch({ type: AUTH_USER_FAILED, payload: message });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    Actions.main();
};

const signInUserSuccess = (dispatch) => {  
    dispatch({ type: SIGN_IN_USER_SUCCESS });
}
;
