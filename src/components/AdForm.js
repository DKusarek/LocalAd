import React, { Component } from 'react';
import { View, Image, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { adUpdate } from '../actions';
import { Button, Input, MultilineInput, Panel, PanelSection } from './common';

class AdForm extends Component {
    state = {
        image: null,
      };

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

    render() {
        const { image } = this.state;
        const { labelTextStyle, pickerStyle } = styles;
    
        return (
            <Panel>
                <PanelSection>
                    <Input
                        label="Title"
                        value={this.props.title}
                        onChangeText={
                            value => this.props.adUpdate({ prop: 'title', value })
                        }
                    />
                </PanelSection>
                <PanelSection>
                    <MultilineInput
                        label="Decription"
                        value={this.props.description}
                        onChangeText={
                            value => this.props.adUpdate({ prop: 'description', value })
                        }
                    />
                </PanelSection>
                <PanelSection>
                    <Text style={labelTextStyle}>
                        Category
                    </Text>
                    <View style={pickerStyle}>
                        <Picker
                            selectedValue={this.props.category}
                            onValueChange={
                                value => this.props.adUpdate({ prop: 'category', value })
                            }                         
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
                    <Button onPress={this.pickImage}>
                        Add picture 
                    </Button>
                    {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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


const mapStateToProps = (state) => {
    const { title, description, category } = state.adForm;
    return { title, description, category };
};


export default connect(mapStateToProps, { adUpdate })(AdForm);
