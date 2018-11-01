import {
    SET_MARKER_LOCATION,
    CITY_NAME_CHANGED,
    UPDATE_MAP_REGION   
} from '../actions/types';

const INITIAL_STATE = {
    markerCoords: {
        longitude: 19.9368564,
        latitude: 50.0619474
    },
    cityName: '',
    mapRegion: {        
        latitude: 50.0619474,
        longitude: 19.9368564,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MARKER_LOCATION:
            return { ...state, markerCoords: action.payload };
        case CITY_NAME_CHANGED:
            return { ...state, cityName: action.payload };
        case UPDATE_MAP_REGION:
            const newMapRegion = {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                latitudeDelta: state.mapRegion.latitudeDelta,
                longitudeDelta: state.mapRegion.longitudeDelta
            };
            return { ...state, mapRegion: newMapRegion };
        default:
            return state;
    }
};
