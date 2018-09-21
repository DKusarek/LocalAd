import React from 'react';
import { View } from 'react-native';

const PanelSection = (props) => (
    <View style={[styles.containerStyle, props.style]}>
    {props.children}
    </View>
);

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { PanelSection };
