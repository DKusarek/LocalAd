import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Tag = ({ tagName, onPress }) => (
    <View style={styles.tagStyle}>
        <Text style={styles.tagTextStyle}>
            {tagName}
        </Text>
        <TouchableOpacity onPress={onPress}style={styles.buttonStyle}>
            <Text style={styles.tagTextStyle}>X</Text>
        </TouchableOpacity>
    </View>
);

const styles = {
    tagStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 10,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 10, 
        flexDirection: 'row',
        alignSelf: 'baseline'
    },
    tagTextStyle: {
        fontSize: 18,
        color: '#1097D8',
    },
    buttonStyle: {
        width: 25, 
        height: 25, 
        flex: 0,   
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#1097D8',
        marginLeft: 5,
        marginRight: 5, 
        paddingLeft: 5   
    },
};

export default Tag;
