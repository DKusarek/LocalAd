import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import { addMessages, fetchMessges, fetchAllUsers } from '../../actions';

class Chat extends Component {
    
    componentWillMount() {
        this.props.fetchMessges(this.props.contactUser.uid);
        GiftedChat.append(this.props.messages);
    }

    onSend(messages) { 
        this.props.addMessages(messages, this.props.contactUser.uid);          
    }

    render() {        
        const { currentUser } = firebase.auth();   
        return (
            <View style={{ flex: 1 }}>
                <Header
                    backgroundColor='#1097D8'
                    centerComponent={{ 
                        text: `${this.props.contactUser.firstName} ${this.props.contactUser.lastName}`,
                        style: { color: '#fff' } }}
                />
                <GiftedChat
                    messages={this.props.messages}
                    onSend={value => this.onSend(value)}
                    user={{
                        _id: currentUser.uid
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
export default connect(mapStateToProps, { addMessages, fetchMessges, fetchAllUsers })(Chat);
