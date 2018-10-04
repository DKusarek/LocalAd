import React from 'react';
import { View, CheckBox, Text } from 'react-native';
import { PanelSection } from './PanelSection';


const CategoryPanel = ({
    onChangeServicesAndCompanies,
    onChangeFashion,
    onChangeSportAndHobby,
    onChangeElectronics,
    onChangeAutomotive,
    onChangeHomeAndGarden,
    onChangePets,
    onChangeAll

}) => {
    const { panelSectionStyle, textStyle } = styles;
    return (
    <View>
        <PanelSection style={panelSectionStyle}>
            <CheckBox
                onChange={onChangeServicesAndCompanies}                
            />
            <Text style={textStyle}>Services And Companies</Text>
            <CheckBox
                onChange={onChangeFashion}                  
            />
            <Text style={textStyle}>Fashion</Text>
        </PanelSection>
        <PanelSection style={panelSectionStyle}>
            <CheckBox
                onChange={onChangeSportAndHobby}                   
            />
            <Text style={textStyle}>Sport And Hobby</Text>
            <CheckBox
                onChange={onChangeElectronics}                    
            />
            <Text style={textStyle}>Electronics</Text>
            <CheckBox
                onChange={onChangeAutomotive}                   
            />
            <Text style={textStyle}>Automotive</Text>
        </PanelSection>
        <PanelSection>
            <CheckBox
                onChange={onChangeHomeAndGarden}                    
            />
            <Text style={textStyle}>Home And Garden</Text>
            <CheckBox
                onChange={onChangePets}                     
            />
            <Text style={textStyle}>Pets</Text>
            <CheckBox
                onChange={onChangeAll}                     
            />
            <Text style={textStyle}>All</Text>
        </PanelSection>
    </View>
    );
};

const styles = {
    panelSectionStyle: {
        borderBottomWidth: 0
    },
    textStyle: {
       paddingTop: 5
    }
};

export { CategoryPanel };
