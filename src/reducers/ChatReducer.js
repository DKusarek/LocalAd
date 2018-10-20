import { GiftedChat } from 'react-native-gifted-chat';

import { 
    ADD_MESSAGE,
    FETCH_MESSAGES,
    MESSAGE_RECIVED
} from '../actions/types';

const INITIAL_STATE = {
    isNew: false, 
    messages: []
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
    default:
      return state;
  }
};
