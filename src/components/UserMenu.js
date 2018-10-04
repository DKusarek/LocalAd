import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Button, Panel, PanelSection } from './common';

class UserMenu extends Component {
    onAddNewPress() {
        Actions.adCreate();
    }
    
    onViewYourAdsPress() {
        Actions.adToEditList();
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
                    <Button>
                        Change password
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button>
                        Log out
                    </Button>
                </PanelSection>
            </Panel>
        );
    }
}

export default UserMenu;
