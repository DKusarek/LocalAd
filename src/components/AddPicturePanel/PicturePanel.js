import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Button, Panel, PanelSection } from './../common';
import { addPicture } from '../../actions';

class PicturePanel extends Component {
    pickImageFromGalery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
    
        if (!result.cancelled) {
            this.props.addPicture({ image: result.uri });            
        }
    };

    takePhoto = async () => {                 
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.props.addPicture({ image: result.uri });            
        }                  
    }
    
    render() {
        const { image } = this.props;

        return (
            <Panel>
                <PanelSection>
                {image &&
          <Image source={{ uri: image }} style={{ width: 340, height: 200 }} />}
                </PanelSection>
                <PanelSection>
                    <Button onPress={this.pickImageFromGalery}>
                        Choose picture from galery
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button onPress={this.takePhoto}>
                        Take a picture
                    </Button>
                </PanelSection>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    const { image } = state.adForm;
    return { image };
};

export default connect(mapStateToProps, { addPicture })(PicturePanel);
