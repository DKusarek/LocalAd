import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    AD_UPDATE,
    AD_CREATE
 } from './types';

export const adUpdate = ({ prop, value }) => {
    return {
        type: AD_UPDATE,
        payload: { prop, value }
    };
};

export const adCreate = ({ title, description, category }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/ads`)
        .push({ title, description, category })
        .then(() => {
            dispatch({ type: AD_CREATE });
            Actions.adList();
        });
    };
};
