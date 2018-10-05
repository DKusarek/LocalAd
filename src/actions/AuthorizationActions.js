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
    PASSWORD2_CHANGED,    
    PASSWORD3_CHANGED,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS
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

export const password3Changed = (text) => {
    return {
        type: PASSWORD3_CHANGED,
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
};

export const changePassword = ({ password, password2, password3 }) => {
    return (dispatch) => {
        dispatch({ type: CHANGE_PASSWORD });
        firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(
            firebase.auth.EmailAuthProvider.credential(
              firebase.auth().currentUser.email, 
              password
            )            
        )
        .then(() => {
            if (password2 !== password3) {
                authUserFailed(dispatch, 'Given new passwords are not identical');
            } else if (password === password2) {
                authUserFailed(dispatch, 'Given new password is the same as an old one');
            } else {
                firebase.auth().currentUser.updatePassword(password2)
                .then(() => dispatch({ type: CHANGE_PASSWORD_SUCCESS }))
                .catch((error) => authUserFailed(dispatch, error.message));
            }
        })
        .catch(() => {
            authUserFailed(dispatch, 'Incorrect old password');
        });
    };
};
