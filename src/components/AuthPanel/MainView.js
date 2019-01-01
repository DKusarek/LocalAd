import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Panel, PanelSection } from '../../components/common';

class MainView extends Component {
    render() {
        const { 
            panelSectionStyle, 
            imageContainerStyle, 
            imageStyle,
            textContainerStyle,
            textStyle,
            textStyleGuest
        } = styles;
        return (
            <Panel>
                <PanelSection style={panelSectionStyle}>
                    <View style={imageContainerStyle}>
                        <Image 
                            style={imageStyle}
                            source={require('../../images/localad.png')} 
                        />
                    </View>
                </PanelSection>
                <PanelSection style={panelSectionStyle}>
                    <View style={textContainerStyle}>
                        <TouchableOpacity onPress={() => Actions.login()}>
                            <Text style={textStyle}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </PanelSection>
                <PanelSection style={panelSectionStyle}>
                    <View style={textContainerStyle}>
                        <TouchableOpacity onPress={() => Actions.signIn()}>
                            <Text style={textStyle}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </PanelSection>
                <PanelSection style={panelSectionStyle}>
                    <View style={textContainerStyle}>
                        <TouchableOpacity onPress={() => Actions.adListForGuests()}>
                            <Text style={textStyleGuest}>Continue as a guest</Text>
                        </TouchableOpacity>
                    </View>
                </PanelSection>
            </Panel>
        );
    }
}

const styles = {    
    panelSectionStyle: {
        borderBottomWidth: 0
    },
    imageContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 200
    },
    textContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textStyle: {
        paddingTop: 10,
        paddingBottom: 10,        
        fontSize: 18,
        color: '#1097D8'
    },
    textStyleGuest: {
        paddingTop: 10,
        paddingBottom: 20,        
        fontSize: 18,
        color: '#1097D8'   
    },
    imageStyle: {
        height: 200
    }
};

export default MainView;
