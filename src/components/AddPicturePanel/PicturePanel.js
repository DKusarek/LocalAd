import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Button, Panel, PanelSection } from './../common';


class PicturePanel extends Component {
    state = { image: null, };

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    render() {
        const { image } = this.state;
        
        return (
            <Panel>
                <PanelSection>
                {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </PanelSection>
                <PanelSection>
                    <Button onPress={this.pickImage}>
                        Choose picture from galery
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button>
                        Take a picture
                    </Button>
                </PanelSection>
            </Panel>
        );
    }
}

export default PicturePanel;
