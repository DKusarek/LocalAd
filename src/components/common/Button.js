import React from 'react';
import { 
    Text, 
    TouchableOpacity 
} from 'react-native';

const Button = ({ onPress, children, style }) => {
    const { buttonStyle, textStyle } = styles;    
    return (
        <TouchableOpacity 
            nPress={onPress} 
            style={[buttonStyle, style]}
        >
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#1097D8',
        marginLeft: 5,
        marginRight: 5
    },
    textStyle: {
        alignSelf: 'center',
        color: '#1097D8',
        fontSize: 18,
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { Button };
