import React, { Component } from 'react';
import { Platform, View, TextInput, Dimensions, Text } from 'react-native';
import { Constants, Location, MapView } from 'expo';
import { connect } from 'react-redux';
import { setMarkerCoords, cityNameChanged, updateMapRegion } from '../../actions';
import { Button, Panel, PanelSection, Inform } from './../common';


class LocationPanel extends Component {
    /* ... */
    state = { showModal: false };

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log('Oops, this will not work on Sketch in an ' +
            'Android emulator. Try it on your device!');
        } 
        this.props.updateMapRegion(
            this.props.markerCoords.longitude, 
            this.props.markerCoords.latitude
        );
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

    render() {
        const { container, map, inputStyle, labelStyle } = styles;
        return (
            <View>
            <Panel>
                <PanelSection>
                    <Text style={labelStyle}>Change location</Text>
                    <TextInput 
                        placeholder="Type city name"
                        onChangeText={this.onCityNameChange.bind(this)}    
                        value={this.props.cityName}                        
                        underlineColorAndroid='transparent'
                        style={inputStyle} 
                    />
                </PanelSection>
                
                <PanelSection>
                    <Button onPress={this.onButtonShowPress.bind(this)}>Change Location</Button>
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
                    title={'Advertaiser Localization'}
                />
                </MapView>                
            </View>   
        </View>
        );                
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 130,
        left: 5,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: Dimensions.get('window').width - 10, 
        height: Dimensions.get('window').height - 220
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
    }
};

const mapStateToProps = state => {
    const { markerCoords, cityName, mapRegion } = state.location;
    return { markerCoords, cityName, mapRegion };
};

export default connect(mapStateToProps, 
    { setMarkerCoords, cityNameChanged, updateMapRegion })(LocationPanel);
