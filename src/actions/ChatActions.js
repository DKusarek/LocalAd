import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    ADD_MESSAGE,
    FETCH_MESSAGES,
    MESSAGE_RECIVED,
    FETCH_ALL_USERS,
    FETCH_RECENT_USERS,
    OPEN_CHAT
} from './types';

export const contactWithAdvertaiser = (owner) => {
    return (dispatch) => {      
        firebase.database().ref('/userInfo')
            .on('value', snapshot => {       
                if (snapshot.val() != null) {                
                    Object.keys(snapshot.val()).forEach((key) => {
                        if (snapshot.val()[key].uid === owner) {
                            dispatch({ type: OPEN_CHAT });
                            Actions.chatView({ contactUser: snapshot.val()[key] });
                        }
                    });
                }
            });
        };
};

export const addMessages = (message, userUid) => {
    const { currentUser } = firebase.auth(); 
    message[0].user._id = currentUser.uid;
    message[0].createdAt = new Date();
    
    return (dispatch) => {      
        firebase.database().ref('/userInfo')
            .on('value', snapshot => {       
                if (snapshot.val() != null) {                
                    Object.keys(snapshot.val()).forEach((key) => {
                        if (snapshot.val()[key].uid === currentUser.uid) {
                            message[0].user.name = 
                            `${snapshot.val()[key].firstName} ${snapshot.val()[key].lastName}`;
                        }
                    });
                }
                    firebase.database().ref(`/messages/${currentUser.uid}/${userUid}`)
                            .push({ message })
                            .then(() => {            
                                dispatch({ type: ADD_MESSAGE, payload: message });
                            })
                            .catch((error) => console.log(error));    
            }); 
    };   
};

export const fetchMessges = (userUid) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        var data = [];
        dispatch({ type: FETCH_MESSAGES });
        firebase.database().ref(`/messages/${currentUser.uid}/${userUid}`)
            .orderByKey()
            .limitToLast(30)
            .on('value', (snapshot) => {                
                firebase.database().ref(`/messages/${userUid}/${currentUser.uid}`)
                .orderByKey()
                .limitToLast(30)
                .on('value', (snapshot1) => {
                    data = { ...snapshot1.val(), ...snapshot.val() };
                    handleData(dispatch, data);
                });          
             });
    };
};

export const fetchRecentUsers = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref('/messages')
        .on('value', messages => {   
            var userUids = [];
            if (messages.val() !== null) {
                Object.keys(messages.val()).forEach((key0, index) => {    
                    if (Object.keys(messages.val())[index] === currentUser.uid) {
                        Object.keys(messages.val()[key0]).forEach((key1, index1) => {    
                            userUids.push(Object.keys(messages.val()[key0])[index1]);
                        });
                    } else if (Object.keys(messages.val()[key0])[index] 
                            === currentUser.uid) {                            
                            userUids.push(Object.keys(
                                messages.val())[index]);                          
                    }                 
                });
            }
            firebase.database().ref('/userInfo')
            .on('value', snapshot => {            
                var users = {};
                if (snapshot.val() != null) {                
                    Object.keys(snapshot.val()).forEach((key) => {
                        if (userUids.includes(snapshot.val()[key].uid)) {
                            users[key] = snapshot.val()[key];
                        }
                    });
                }
                dispatch({ type: FETCH_RECENT_USERS, payload: users });
            });
        });
    };
};

export const fetchAllUsers = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref('/userInfo')
        .on('value', snapshot => {            
            var users = {};
            if (snapshot.val() != null) {                
                Object.keys(snapshot.val()).forEach((key) => {
                    if (snapshot.val()[key].uid !== currentUser.uid) {
                        users[key] = snapshot.val()[key];
                    }
                });
            }
            dispatch({ type: FETCH_ALL_USERS, payload: users });
        });
    };
};


const handleData = (dispatch, data) => {
    const messages = [];
    Object.values(data).forEach(msg => {
        messages.unshift(msg);
    });

    dispatch({ type: MESSAGE_RECIVED, payload: messages });
};
