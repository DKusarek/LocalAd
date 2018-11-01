import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { MapView } from 'expo';

class StaticMap extends Component {
    render() {
        const { container, map } = styles;
        const { latitude, longitude } = this.props.location;
        return (
            <View style={container} >
            <MapView 
                style={map}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >
            <MapView.Marker
                coordinate={{
                    longitude,
                    latitude
                }}
                title={'Advertaiser Localization'}
            />
            </MapView>                
        </View>  
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 5,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: Dimensions.get('window').width - 10, 
        height: Dimensions.get('window').height - 90
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
};

export default StaticMap;
