import * as firebase from 'firebase';
import { 
    ADD_MESSAGE,
    FETCH_MESSAGES,
    MESSAGE_RECIVED
} from './types';

export const addMessages = (message) => {
    const { currentUser } = firebase.auth();   
    message[0].user._id=1;
    return (dispatch) => {      
        firebase.database().ref(`/messages/${currentUser.uid}`)
                .push({ message })
                .then(() => {            
                    dispatch({ type: ADD_MESSAGE, payload: message });
                })
                .catch((error) => console.log(error));            
    };   
};

export const fetchMessges = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: FETCH_MESSAGES });
        firebase.database().ref(`/messages/${currentUser.uid}`)
            .orderByKey()
            .limitToLast(30)
            .on('value', (snapshot) => {
                const data = snapshot.val() || [];
                handleData(dispatch, data);
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
