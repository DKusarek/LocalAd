import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Panel, PanelSection, Input, Button, Spinner } from '../../components/common';
import { 
    emailChanged, 
    passwordChanged, 
    password2Changed, 
    signInUser,
    firstNameChanged,
    lastNameChanged
} from '../../actions';

class SignInForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onFirstNameChange(text) {
        this.props.firstNameChanged(text);
    }

    onLastNameChange(text) {
        this.props.lastNameChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onPassword2Change(text) {
        this.props.password2Changed(text);
    }

    onSignInButtonPress() {
        const { email, password, password2, firstName, lastName } = this.props;
        this.props.signInUser({ email, password, password2, firstName, lastName });
    }

    onLogInButtonPress() {
        Actions.login();
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderSuccessSignIn() {
        if (this.props.signInSuccess) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.signInSuccessTextStyle}>
                        {this.props.signInSuccess}
                    </Text>
                </View>
            );
        }
    }

    renderButtonSignIn() {
        if (this.props.loadingSignIn) {
            return (
                <Spinner size="large" />
            );
        } else if (this.props.signInSuccess) {
            return (
            <Button onPress={this.onLogInButtonPress.bind(this)}>
                Log in
            </Button>
            );  
        }
        return (
            <Button onPress={this.onSignInButtonPress.bind(this)}>
                Sign in
            </Button>
        );            
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
            <Panel>
                <PanelSection>
                    <Input 
                        label="Email"
                        placeholder="user@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}    
                        value={this.props.email}
                    />
                </PanelSection>
                <PanelSection>
                    <Input 
                        label="First Name"
                        placeholder="first name"
                        onChangeText={this.onFirstNameChange.bind(this)}    
                        value={this.props.firstName}
                    />
                </PanelSection>
                <PanelSection>
                    <Input 
                        label="Last Name"
                        placeholder="last name"
                        onChangeText={this.onLastNameChange.bind(this)}    
                        value={this.props.lastName}
                    />
                </PanelSection>
                <PanelSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </PanelSection>
                <PanelSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="Type again"
                        onChangeText={this.onPassword2Change.bind(this)}
                        value={this.props.password2}
                    />
                </PanelSection>                
                {this.renderError()}
                {this.renderSuccessSignIn()}
                <PanelSection>
                    {this.renderButtonSignIn()} 
                </PanelSection>
            </Panel>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} />
        </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20, 
        alignSelf: 'center',
        color: 'red',
        textAlign: 'center'
    },
    signInSuccessTextStyle: {
        fontSize: 20, 
        alignSelf: 'center',
        color: 'green',
        textAlign: 'center'
    },
    textStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        textAlign: 'center'
    }
};

const mapStateToProps = (state) => {
    const { email, password, password2, error, signInSuccess, loadingSignIn, firstName, lastName } = 
    state.authorization;
    return {
        email,
        password,
        password2,
        error,
        signInSuccess,
        loadingSignIn,
        firstName,
        lastName
    };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, password2Changed, signInUser, firstNameChanged, lastNameChanged
})(SignInForm);

