import { GiftedChat } from 'react-native-gifted-chat';

import { 
    ADD_MESSAGE,
    FETCH_MESSAGES,
    MESSAGE_RECIVED,
    FETCH_RECENT_USERS,
    FETCH_ALL_USERS,
    OPEN_CHAT
} from '../actions/types';

const INITIAL_STATE = {
    isNew: false, 
    messages: [],
    recentUsers: [],
    allUsers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
        state.messages = GiftedChat.append(state.messages, action.payload);
        return { ...state, isNew: true };
    case FETCH_MESSAGES:
        return { ...INITIAL_STATE };
    case MESSAGE_RECIVED: {
        if (!state.isNew) {
            state.messages = [];
            for (let i = 0; i < action.payload.length; i++) {
                const { message } = action.payload[i];
                state.messages.push(message[0]);
            }            
            return { ...state, isNew: true };
        } 
        return { ...state };        
    }
    case FETCH_RECENT_USERS:
        return { ...state, recentUsers: action.payload };
    case FETCH_ALL_USERS:
        return { ...state, allUsers: action.payload };
    case OPEN_CHAT:
        return { ...INITIAL_STATE };
    default:
      return state;
  }
};
