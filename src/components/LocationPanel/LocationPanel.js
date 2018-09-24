import React, { Component } from 'react';
import { Text } from 'react-native';
import { Location } from 'expo';
import { Button, Panel, PanelSection } from './../common';


class LocationPanel extends Component {
    onButtonPress() {
        Location.getCurrentPositionAsync()
        .then((result) => console.log(result));
    }

    render() {
        return (
            <Panel>
                <PanelSection>
                    <Button onPress={this.onButtonPress}>Get Location</Button>
                </PanelSection>
            </Panel>
        );
    }
}

export default LocationPanel;
