import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Panel, PanelSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser, signInUser } from '../actions';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLogInButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    onSignInButtonPress() {
        const { email, password } = this.props;
        this.props.signInUser({ email, password });
    }

    onContinueAsGuestButtonPress() {
        Actions.adListForGuests();
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

    renderButtonLogIn() {
        if (this.props.loadingLogin) {
            return (
                <Spinner size="large" />
            );
        } 
        return (
            <Button onPress={this.onLogInButtonPress.bind(this)}>
                Log in
            </Button>
        );        
    }

    renderButtonSignIn() {
        if (this.props.loadingSignIn) {
            return (
                <Spinner size="large" />
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
            <View>
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
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </PanelSection>
                {this.renderError()}
                {this.renderSuccessSignIn()}
                <PanelSection>
                    {this.renderButtonLogIn()} 
                </PanelSection>
                <PanelSection>
                    {this.renderButtonSignIn()} 
                </PanelSection>
            </Panel>
                <Panel style={{ flex: 1 }}>
                    <PanelSection>
                        <Text style={styles.textStyle}>
                            If you only wishing to look through adds please
                        </Text>
                        </PanelSection>
                        <PanelSection>
                        <Button 
                            onPress={this.onContinueAsGuestButtonPress.bind(this)}
                        >
                            Continue as guest
                        </Button>
                    </PanelSection>
                 </Panel>
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
    const { email, password, error, signInSuccess, loadingLogin, loadingSignIn } = 
    state.authorization;
    return {
        email,
        password,
        error,
        signInSuccess,
        loadingLogin,
        loadingSignIn
    };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser, signInUser
})(LoginForm);

