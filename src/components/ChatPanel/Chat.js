import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { addMessages } from '../../actions';
import Fire from './Fire';

class Chat extends Component {
    state = {
        messages: [],
      };
     
    componentDidMount() {
        Fire.shared.on(message =>
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
          }))
        );
    }
    // onSend(message) {
    //     this.props.addMessages({ message });
    // }

    componentWillUnmount() {
        Fire.shared.off();
      }

      get user() {
        // const { currentUser } = firebase.auth();
        // console.log(currentUser);
        // Return our name and our UID for GiftedChat to parse
        return {
          name: "Nika",
          _id: 1
        };
      }

      render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
          />
        );
      }
}

// const mapStateToProps = (state) => {
//     const { messages } = state.chat;
//     return { messages };
// };
export default Chat;
//export default connect(mapStateToProps, { addMessages })(Chat);
