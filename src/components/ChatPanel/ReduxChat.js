import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { addMessages, fetchMessges } from '../../actions';
import Fire from './Fire';

class ReduxChat extends Component {
    
    componentWillMount() {
        console.log('tylko raz');
        this.props.fetchMessges();
        GiftedChat.append(this.props.messages);
    }

    onSend(messages) { 
        this.props.addMessages(messages);          
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={this.props.messages}
                    onSend={value => this.onSend(value)}
                    user={{
                        _id: 1,
                    }}
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
export default connect(mapStateToProps, { addMessages, fetchMessges })(ReduxChat);
