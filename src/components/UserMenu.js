import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Button, Panel, PanelSection } from './common';

class UserMenu extends Component {
    onAddNewPress() {
        Actions.adCreate();
    }
    
    onViewYourAdsPress() {
        Actions.adToEditList();
    }

    onChangePasswordButtonPress() {
        Actions.changePassword();
    }
    
    onLogOutPress() {
        firebase.auth().signOut().then(() => {
            Actions.mainView();
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Panel>
                <PanelSection>
                    <Button onPress={this.onAddNewPress.bind(this)}>
                        Add new Ad
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button onPress={this.onViewYourAdsPress.bind(this)}>
                        View your Ads
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button onPress={this.onChangePasswordButtonPress.bind(this)}>
                        Change password
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button onPress={this.onLogOutPress.bind(this)}>
                        Log out
                    </Button>
                </PanelSection>
            </Panel>
        );
    }
}

export default UserMenu;
