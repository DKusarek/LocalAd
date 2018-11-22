import * as firebase from 'firebase';
import uuid from 'react-native-uuid';
import { Actions } from 'react-native-router-flux';
import { 
    AD_UPDATE,
    AD_CREATE,
    ADS_FETCH_SUCCESS,
    AD_TAG_ADD,
    AD_TAG_DELETE,
    SORT_BY_CHANGED,
    ADS_CHANGED_ORDER,
    SHOW_CATEGORY_PANEL,
    SHOW_LOCATION_PANEL,
    SORT_BY_CATEGORY_CHANGED,
    ADS_TO_EDIT_FETCH_SUCCESS,
    AD_SAVE_SUCCESS,
    FILTER_ADS,
    SEARCH_EMPTY,
    SORT_BY_LOCATION_CHANGED,
    CITY_NAME_CHANGED_LIST,
    CLEAR_AD_FORM
 } from './types';

export const adUpdate = ({ prop, value }) => {
    return {
        type: AD_UPDATE,
        payload: { prop, value }
    };
};

export const adCreate = ({ title, description, category, image, markerCoords, tags }) => {
    const { currentUser } = firebase.auth();
    const adUuid = uuid.v1();
    const uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`images/${adUuid}`);
        return ref.put(blob);
    };

    return (dispatch) => { 
        const today = new Date();
        const publishDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        uploadImage(image)
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/ads`)
                .push({ 
                    title, 
                    description, 
                    category, 
                    image, 
                    publishDate, 
                    adUuid, 
                    owner: currentUser.uid,
                    location: markerCoords,
                    tags
                })
                .then(() => {            
                    dispatch({ type: AD_CREATE });
                    Actions.adList();
                })
                .catch((error) => console.log(error.message));    
            })
            .catch((error) => console.log(error.message));    
        };
};

export const adsFetchEdit = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/ads`)
        .on('value', snapshot => {
            dispatch({ type: ADS_TO_EDIT_FETCH_SUCCESS, payload: snapshot.val() });
        })
        .catch((error) => console.log(error.message));    
    };
};


export const adsFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/users')
        .on('value', snapshot => {
            var ads = {};
            if (snapshot.val() != null) {
                Object.keys(snapshot.val()).forEach((key) => {
                    Object.keys(snapshot.val()[key]).forEach((insideKey) => {
                        Object.keys(snapshot.val()[key][insideKey]).forEach((moreInsideKey) => {
                            ads[moreInsideKey] = (snapshot.val()[key][insideKey][moreInsideKey]);
                        });
                    });
                });
            }
            dispatch({ type: ADS_FETCH_SUCCESS, payload: ads });
        });
    };
};

export const searchAd = (text, adTitles, adTags) => {
    return (dispatch) => {
        if (text !== '') {
            firebase.database().ref('/users')
            .on('value', snapshot => {
                var ads = {};
                if (snapshot.val() != null) {
                    Object.keys(snapshot.val()).forEach((key) => {
                        Object.keys(snapshot.val()[key]).forEach((insideKey) => {
                            Object.keys(snapshot.val()[key][insideKey]).forEach((moreInsideKey) => {
                                if (snapshot.val()[key][insideKey][moreInsideKey].title.includes(text) && 
                                adTitles.includes(snapshot.val()[key][insideKey][moreInsideKey].title)) {
                                    ads[moreInsideKey] = (snapshot.val()[key][insideKey][moreInsideKey]);
                                }
                                if (snapshot.val()[key][insideKey][moreInsideKey].tags !== undefined) { 
                                    snapshot.val()[key][insideKey][moreInsideKey].tags.forEach(tag => {
                                        if (tag.includes(text) && adTags.includes(tag)) {
                                            ads[moreInsideKey] = (snapshot.val()[key][insideKey][moreInsideKey]);
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
                dispatch({ type: FILTER_ADS, payload: ads });
            });
        } else {
            dispatch({ type: SEARCH_EMPTY });
        }
    };
};

export const adSave = ({ title, description, category, image, adUuid, uid, markerCoords, tags }) => {
    const { currentUser } = firebase.auth();
    const uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`images/${adUuid}`);
        return ref.put(blob);
    };
    
    return (dispatch) => {        
        const today = new Date();
        const publishDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        uploadImage(image)
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/ads/${uid}`)
                .set({ 
                    title, 
                    description, 
                    category, 
                    image, 
                    publishDate, 
                    adUuid, 
                    location: markerCoords,
                    tags 
                })
                .then(() => {
                    dispatch({ type: AD_SAVE_SUCCESS });
                    Actions.adToEditList();
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const adDelete = (uid, adUuid) => {
    return () => {
    firebase.storage().ref()
        .child(`images/${adUuid}`)
        .delete()
        .then(() => {
            const { currentUser } = firebase.auth();            
            firebase.database().ref(`/users/${currentUser.uid}/ads/${uid}`)
            .remove()
            .then(() => {
                Actions.adToEditList();
            });
        })
        .catch((error) => {
            console.log(error);
        });         
    };
};

export const adsChangedOrder = (ads) => {
    return {
        type: ADS_CHANGED_ORDER,
        payload: ads
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

export const showLocationPanel = () => {
    return {
        type: SHOW_LOCATION_PANEL
    };
};


export const sortByCategoryChanged = (category) => {
    return {
        type: SORT_BY_CATEGORY_CHANGED,
        payload: category
    };
};

export const sortByLocationChanged = (distance) => {
    return {
        type: SORT_BY_LOCATION_CHANGED,
        payload: distance
    };
};

export const cityNameChangedList = (text) => {
    return {
        type: CITY_NAME_CHANGED_LIST,
        payload: text        
    };
};

export const clearForm = () => {
    return {
        type: CLEAR_AD_FORM
    };
};
