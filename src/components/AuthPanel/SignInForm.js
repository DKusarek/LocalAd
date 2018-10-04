import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Panel, PanelSection, Input, Button, Spinner } from '../../components/common';
import { emailChanged, passwordChanged, password2Changed, signInUser } from '../../actions';
import { Actions } from 'react-native-router-flux';

class SignInForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onPassword2Change(text) {
        this.props.password2Changed(text);
    }

    onSignInButtonPress() {
        const { email, password, password2 } = this.props;
        this.props.signInUser({ email, password, password2 });
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
    const { email, password, password2, error, signInSuccess, loadingSignIn } = 
    state.authorization;
    return {
        email,
        password,
        password2,
        error,
        signInSuccess,
        loadingSignIn
    };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, password2Changed, signInUser
})(SignInForm);

