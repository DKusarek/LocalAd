import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    AD_UPDATE,
    AD_CREATE,
    AD_ADD_PICTURE
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
        const ref = firebase.storage().ref().child('images/testimage');
        return ref.put(blob);
    };

    return (dispatch) => { 
        console.log(image); 
        uploadImage(image)
            .then(() => console.log('success'))
            .catch((error) => console.log(error.message));    
        firebase.database().ref(`/users/${currentUser.uid}/ads`)
        .push({ title, description, category })
        .then(() => {            
            dispatch({ type: AD_CREATE });
            Actions.adList();
        });
    };
};

export const addPicture = ({ image }) => {
    return {
        type: AD_ADD_PICTURE,
        payload: image
    };
};

