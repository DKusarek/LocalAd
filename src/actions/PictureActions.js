import * as firebase from 'firebase';
import { 
    GET_DEFAULT_IMAGE,
    AD_ADD_PICTURE,
    ADS_FETCH_PICTURE_SUCCESS,    
    UPDATE_PICTURE
} from './types';


export const addPicture = ({ image }) => {
    return {
        type: AD_ADD_PICTURE,
        payload: image
    };
};

export const getPicture = (adUuid) => {
    return (dispatch) => {
        const ref = firebase.storage().ref()
        .child(`images/${adUuid}`);
        ref.getDownloadURL()
        .then((url) => {
           dispatch({ type: ADS_FETCH_PICTURE_SUCCESS, payload: { url, adUuid } });
        })
        .catch((error) => console.log(error));
    };
};

export const updatePicture = (adUuid) => {
    return (dispatch) => {
        const ref = firebase.storage().ref()
        .child(`images/${adUuid}`);
        ref.getDownloadURL()
        .then((url) => {
           dispatch({ type: UPDATE_PICTURE, payload: { url, adUuid } });
        })
        .catch((error) => console.log(error));
    };
};

export const getDefaultImage = () => {
    return (dispatch) => {
        const ref = firebase.storage().ref()
        .child('images/localad.png');
        ref.getDownloadURL()
        .then((url) => {
           dispatch({ type: GET_DEFAULT_IMAGE, payload: url });
        })
        .catch((error) => console.log(error));
    };
};
