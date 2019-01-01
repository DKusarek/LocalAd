import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Panel, PanelSection, Input, Button, Spinner } from '../../components/common';
import { passwordChanged, password2Changed, password3Changed, changePassword } from '../../actions';

class SignInForm extends Component {
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onPassword2Change(text) {
        this.props.password2Changed(text);
    }

    onPassword3Change(text) {
        this.props.password3Changed(text);
    }

    onChangePasswordButtonPress() {
        const { password, password2, password3 } = this.props;
        this.props.changePassword({ password, password2, password3 });
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

    renderButtonChangePassword() {
        if (this.props.loadingChangePassword) {
            return (
                <Spinner size="large" />
            );
        } else if (this.props.changePasswordSuccess) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.passwordChangedSuccessTextStyle}>
                        {this.props.changePasswordSuccess}
                    </Text>
                </View>
            );
        }
        return (
            <Button onPress={this.onChangePasswordButtonPress.bind(this)}>
                Change Password
            </Button>
        );            
    }
    
    render() {
        return (
            <View>
            <Panel>
                <PanelSection>
                    <Input 
                        secureTextEntry
                        label="Old Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </PanelSection>
                <PanelSection>
                    <Input 
                        secureTextEntry
                        label="New Password"
                        placeholder="password"
                        onChangeText={this.onPassword2Change.bind(this)}
                        value={this.props.password2}
                    />
                </PanelSection>
                <PanelSection>
                    <Input 
                        secureTextEntry
                        label="New Password"
                        placeholder="Type again"
                        onChangeText={this.onPassword3Change.bind(this)}
                        value={this.props.password3}
                    />
                </PanelSection>
                {this.renderError()}
                <PanelSection>
                    {this.renderButtonChangePassword()} 
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
    passwordChangedSuccessTextStyle: {
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
    const { 
        email, 
        password, 
        password2, 
        password3, 
        error, 
        changePasswordSuccess, 
        loadingChangePassword 
    } = 
    state.authorization;
    return {
        email,
        password,
        password2,
        password3,
        error,
        changePasswordSuccess,
        loadingChangePassword
    };
};

export default connect(mapStateToProps, { 
    passwordChanged, password2Changed, password3Changed, changePassword
})(SignInForm);

