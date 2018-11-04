import React from 'react';
import { View, TextInput, Text, CheckBox } from 'react-native';
import { PanelSection } from './PanelSection';

const LocationPanel = ({
    onChange0,
    onChange5,
    onChange10,
    onChange25,
    onChange50,
    onChange75,
    onChange100,
    value,
    onChangeText
}) => {
    const { labelStyle, inputStyle, panelSectionStyle, textStyle } = styles;
    return (
    <View>
        <PanelSection style={panelSectionStyle}>
            <Text style={labelStyle}>Type Location</Text>
            <TextInput 
                onChangeText={onChangeText}
                value={value}
                placeholder="Cracow"                    
                underlineColorAndroid='transparent'
                style={inputStyle} 
            />
        </PanelSection>
        <PanelSection style={panelSectionStyle}>
            <CheckBox 
                onChange={onChange0}
            />
            <Text style={textStyle}>+0 km</Text>
            <CheckBox 
                onChange={onChange5}
            />
            <Text style={textStyle}>+5 km</Text>            
            <CheckBox 
                onChange={onChange10}
            />
            <Text style={textStyle}>+10 km</Text>            
            <CheckBox 
                onChange={onChange25}
            />
            <Text style={textStyle}>+25 km</Text>        
        </PanelSection>
        <PanelSection style={panelSectionStyle}>                       
            <CheckBox 
                onChange={onChange50}
            />
            <Text style={textStyle}>+50 km</Text>                 
            <CheckBox 
                onChange={onChange75}
            />
            <Text style={textStyle}>+75 km</Text>                      
            <CheckBox 
                onChange={onChange100}
            />
            <Text style={textStyle}>+100 km</Text>
        </PanelSection>
    </View>
    );
};

const styles = {
    panelSectionStyle: {
        borderBottomWidth: 0
    },
    labelStyle: {
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5
    },
    inputStyle: {
        flex: 2
    },
    textStyle: {
        paddingTop: 5
    }
};

export { LocationPanel };
