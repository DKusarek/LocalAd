import { 
    SET_MARKER_LOCATION,
    CITY_NAME_CHANGED,
    UPDATE_MAP_REGION
} from './types';

export const setMarkerCoords = (coords) => {
    return {
        type: SET_MARKER_LOCATION,
        payload: coords
    };
};

export const cityNameChanged = (text) => {
    return {
        type: CITY_NAME_CHANGED,
        payload: text
    };
};

export const updateMapRegion = (longitude, latitude) => {
    return {
        type: UPDATE_MAP_REGION,
        payload: {
            longitude,
            latitude
        }
    };
};
