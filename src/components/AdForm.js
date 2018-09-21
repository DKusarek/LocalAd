import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { Button, Input, MultilineInput, Panel, PanelSection } from './common';

class AdForm extends Component {
    
    render() {
        const { labelTextStyle, pickerStyle } = styles;
    
        return (
            <Panel>
                <PanelSection>
                    <Input
                        label="Title"
                    />
                </PanelSection>
                <PanelSection>
                    <MultilineInput
                        label="Decription"
                    />
                </PanelSection>
                <PanelSection>
                    <Text style={labelTextStyle}>
                        Category
                    </Text>
                    <View style={pickerStyle}>
                        <Picker
                            selectedValue={''}
                            onValueChange={() => {}}                         
                        >                    
                            <Picker.Item label="Services And Companies" value="0" />
                            <Picker.Item label="Fashion" value="1" />
                            <Picker.Item label="Sport And Hobby" value="2" />
                            <Picker.Item label="Electronics" value="3" />
                            <Picker.Item label="Automotive" value="4" />
                            <Picker.Item label="Home And Garden" value="5" />
                            <Picker.Item label="Pets" value="6" />
                        </Picker>
                    </View>
                </PanelSection>
                <PanelSection>
                    <Text style={labelTextStyle}>
                        Tags
                    </Text>
                </PanelSection>
                <PanelSection>
                    <Button>
                        Localization
                    </Button>
                </PanelSection>                
                <PanelSection>
                    <Button>
                        Add Picture
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button>
                        Publish Add
                    </Button>
                </PanelSection>
            </Panel>
        );
    }
}

const styles = {
    labelTextStyle: {
      fontSize: 18,
      paddingLeft: 20
    },
    pickerStyle: {
        flex: 1,
        paddingLeft: 80,        
        justifyContent: 'flex-start'
    }
  };


export default AdForm;
