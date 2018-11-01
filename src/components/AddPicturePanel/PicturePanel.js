import React, { Component } from 'react';
import { Image, PermissionsAndroid } from 'react-native';
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
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Cool Photo App Camera Permission',
              message: 'Cool Photo App needs access to your camera ' +
                         'so you can take awesome pictures.'
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
        
            if (!result.cancelled) {
                this.props.addPicture({ image: result.uri });            
            }
          } else {
            console.log('Camera permission denied');
          }

        
    }
    
    render() {
        const { image } = this.props;
        console.log(image);

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
