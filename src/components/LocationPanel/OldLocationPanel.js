import React, { Component } from 'react';
import { View, TextInput, Dimensions, Text } from 'react-native';
import { Location, MapView } from 'expo';
import { connect } from 'react-redux';
import { setMarkerCoords, cityNameChanged, updateMapRegion, saveLocation } from '../../actions';
import { Button, Panel, PanelSection, Inform } from './../common';


class LocationPanel extends Component {
    state = { showModal: false };

    onButtonPress() {
        Location.getCurrentPositionAsync()
        .then((result) => {
            this.props.setMarkerCoords({
                longitude: result.coords.longitude,
                latitude: result.coords.latitude
            });
        })
        .catch((error) => console.log(error));
    }    

    onCityNameChange(text) {
        this.props.cityNameChanged(text);
    }

    onOK() {
        this.setState({ showModal: false });
    }

    onButtonShowPress() {        
        Location.geocodeAsync(this.props.cityName)
        .then(result => {
            if (result.length === 0) {
                this.setState({ showModal: !this.state.showModal }); 
            } else {
                this.props.setMarkerCoords({
                    longitude: result[0].longitude,
                    latitude: result[0].latitude
                });
                this.props.updateMapRegion(result[0].longitude, result[0].latitude);
            }
        })
        .catch(error => console.log(error));
    }

    onSaveButtonPress() {
        this.props.saveLocation(this.props.markerCoords);
    }

    render() {
        const { container, map, inputStyle, labelStyle, saveButton } = styles;
        return (
            <View>
            <Panel>
                <PanelSection>
                    <Button onPress={this.onButtonPress.bind(this)}>Get Current Location</Button>
                </PanelSection>
                <PanelSection>
                    <Text style={labelStyle}>Or type city name</Text>
                    <TextInput 
                        placeholder="Cracow"
                        onChangeText={this.onCityNameChange.bind(this)}    
                        value={this.props.cityName}                        
                        underlineColorAndroid='transparent'
                        style={inputStyle} 
                    />
                </PanelSection>
                
                <PanelSection>
                    <Button onPress={this.onButtonShowPress.bind(this)}>Show on map</Button>
                </PanelSection>
                <Inform
                    visible={this.state.showModal}
                    onOK={this.onOK.bind(this)}
                >
                    City not recognized
                </Inform>
            </Panel>
            <View style={container} >
                <MapView 
                    style={map}
                    region={this.props.mapRegion}
                >
                <MapView.Marker
                    coordinate={this.props.markerCoords}
                    title={'Cos'}
                    description={'Gdizes'}
                />
                </MapView>                
            </View>            
            <View style={saveButton}>
                <Button onPress={this.onSaveButtonPress.bind(this)}>Save Location</Button>
            </View>
        </View>
        );                
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 185,
        left: 5,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: Dimensions.get('window').width - 10, 
        height: Dimensions.get('window').height - 330
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    inputStyle: {
        color: '#000',
        padding: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1
    },
    labelStyle: {
        alignSelf: 'center',
        color: '#1097D8',
        fontSize: 18,
        fontWeight: '500',
        padding: 10
    },
    saveButton: {
        position: 'absolute',
        top: Dimensions.get('window').height - 140,
        left: 5,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        height: 50,
        width: Dimensions.get('window').width - 10
    }
};

const mapStateToProps = state => {
    const { markerCoords, cityName, mapRegion } = state.location;
    return { markerCoords, cityName, mapRegion };
};

export default connect(mapStateToProps, 
    { setMarkerCoords, cityNameChanged, updateMapRegion, saveLocation })(LocationPanel);
