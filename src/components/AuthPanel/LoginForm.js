import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Panel, PanelSection, Input, Button, Spinner } from '../../components/common';
import { emailChanged, passwordChanged, loginUser, quickLoginIn } from '../../actions';

class LoginForm extends Component {
    componentWillMount() {
        //this.props.quickLoginIn();
    }
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
                <PanelSection>
                    {this.renderButtonLogIn()} 
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
    const { email, password, error, loadingLogin } = 
    state.authorization;
    return {
        email,
        password,
        error,
        loadingLogin
    };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser, quickLoginIn
})(LoginForm);

