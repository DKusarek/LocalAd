import React from 'react';
import { TextInput, View, Text } from 'react-native';

const MultilineInput = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    secureTextEntry
 }) => { 
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid='transparent'
                style={inputStyle} 
                multiline
                numberOfLines={3}
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 20,
        fontSize: 18,
        lineHeight: 23,
        flex: 2      
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 100,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

export { MultilineInput };
