import React from 'react';
import { Icon } from 'react-native-elements';
import { TextInput, View, Text, Button } from 'react-native';

const SearchInput = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    secureTextEntry, 
    multiline,
    numberOfLines
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
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            <Button>
            <Icon
                name='arrow-bold-right'
                color='#00aced' 
            />
            </Button>
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
        height: 80,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
};

export { SearchInput };
