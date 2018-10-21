import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { addMessages, fetchMessges } from '../../actions';

class Chat extends Component {
    
    componentWillMount() {
        this.props.fetchMessges();
        GiftedChat.append(this.props.messages);
    }

    onSend(messages) { 
        this.props.addMessages(messages);          
    }

    render() {        
        const { currentUser } = firebase.auth();   
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={this.props.messages}
                    onSend={value => this.onSend(value)}
                    user={{
                        _id: currentUser.uid,
                        name: currentUser.email
                    }}
                    showUserAvatar
                />
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} />
            </View>
        );
      }
}

const mapStateToProps = (state) => {
    const { messages, fetching } = state.chat;
    return { messages, fetching };
};
export default connect(mapStateToProps, { addMessages, fetchMessges })(Chat);
