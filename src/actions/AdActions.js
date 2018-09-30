import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    AD_UPDATE,
    AD_CREATE,
    AD_ADD_PICTURE,
    ADS_FETCH_SUCCESS,
    ADS_FETCH_PICTURE_SUCCESS,
    AD_TAG_ADD,
    AD_TAG_DELETE
 } from './types';

export const adUpdate = ({ prop, value }) => {
    return {
        type: AD_UPDATE,
        payload: { prop, value }
    };
};

export const adCreate = ({ title, description, category, image }) => {
    const { currentUser } = firebase.auth();
    const uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`images/${currentUser.uid}/${title}`);
        return ref.put(blob);
    };

    return (dispatch) => { 
        uploadImage(image)
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/ads`)
                .push({ title, description, category, image })
                .then(() => {            
                    dispatch({ type: AD_CREATE });
                    Actions.adList();
                });
            })
            .catch((error) => console.log(error.message));    
        };
};

export const addPicture = ({ image }) => {
    return {
        type: AD_ADD_PICTURE,
        payload: image
    };
};

export const adsFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/ads`)
        .on('value', snapshot => {
            dispatch({ type: ADS_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const getPicture = (title) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        const ref = firebase.storage().ref()
        .child(`images/${currentUser.uid}/${title}`);
        ref.getDownloadURL()
        .then((url) => {
           dispatch({ type: ADS_FETCH_PICTURE_SUCCESS, payload: { url, title } });
        })
        .catch((error) => console.log(error.message));
    };
};

export const adTagAdd = (tagName) => {
    return {
        type: AD_TAG_ADD,
        payload: tagName
    };
};

export const adTagDelete = (tagName) => {
    return {
        type: AD_TAG_DELETE,
        payload: tagName
    };
};

