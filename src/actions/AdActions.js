import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    AD_UPDATE,
    AD_CREATE,
    AD_ADD_PICTURE,
    ADS_FETCH_SUCCESS,
    ADS_FETCH_PICTURE_SUCCESS,
    AD_TAG_ADD,
    AD_TAG_DELETE,
    SORT_BY_CHANGED,
    ADS_CHANGED_ORDER,
    SHOW_CATEGORY_PANEL,
    SORT_BY_CATEGORY_CHANGED
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
        const today = new Date();
        const publishDate = today.getFullYear() + '-' 
        + (today.getMonth() + 1) + '-' 
        + today.getDate();
        uploadImage(image)
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/ads`)
                .push({ title, description, category, image, publishDate })
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

export const adsFetchEdit = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/ads`)
        .on('value', snapshot => {
            console.log(snapshot.val());
            dispatch({ type: ADS_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};


export const adsFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        console.log('weszlo');
        firebase.database().ref('/users')
        .once('value')
        .then(snapshot => {
            var ads = {};
            Object.keys(snapshot.val()).forEach((key) => {
                Object.keys(snapshot.val()[key]).forEach((insideKey) => {
                    Object.keys(snapshot.val()[key][insideKey]).forEach((moreInsideKey) => {
                        ads[moreInsideKey] = (snapshot.val()[key][insideKey][moreInsideKey]);
                    });
                });
            });
            dispatch({ type: ADS_FETCH_SUCCESS, payload: ads });
        })
        .catch((error) => console.log(error));
        //     console.log(snapshot.val());
        //     var ads;
        //     snapshot.val().forEach(element => {
        //         element.ads.forEach((el) => {
        //             ads.push(el);
        //         });
        //     });
        //     console.log('ads');
        //     console.log(ads);
        //     dispatch({ type: ADS_FETCH_SUCCESS, payload: snapshot.val() });
        // });
    };
};

export const adsChangedOrder = (ads) => {
    console.log(ads);
    return {
        type: ADS_CHANGED_ORDER,
        payload: ads
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


export const sortByChanged = (sortBy) => {
    return {
        type: SORT_BY_CHANGED,
        payload: sortBy
    };
};

export const showCategoryPanel = () => {
    return {
        type: SHOW_CATEGORY_PANEL
    };
};

export const sortByCategoryChanged = (category) => {
    return {
        type: SORT_BY_CATEGORY_CHANGED,
        payload: category
    };
};
