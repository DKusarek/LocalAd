import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Location } from 'expo';
import { Actions } from 'react-native-router-flux';
import { adUpdate, getDefaultImage, setMarkerCoords } from '../actions';
import { Button, Input, MultilineInput, PanelSection } from './common';
import TagInput from './Tag/TagInput';

class AdForm extends Component {
    componentWillMount() {
        if (this.props.image === undefined) {
            this.props.getDefaultImage();
        }     
        Location.getCurrentPositionAsync()
        .then((result) => {
            this.props.setMarkerCoords({
                longitude: result.coords.longitude,
                latitude: result.coords.latitude
            });
        })
        .catch((error) => console.log(error));        
    }

    getTags() {
       // console.log(this.props);
    }

    render() {
        const { labelTextStyle, pickerStyle } = styles;
    
        return (
            <View>
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
                            <Picker.Item 
                                label="Services And Companies" 
                                value="Services And Companies" 
                            />
                            <Picker.Item label="Fashion" value="Fashion" />
                            <Picker.Item label="Sport And Hobby" value="Sport And Hobby" />
                            <Picker.Item label="Electronics" value="Electronics" />
                            <Picker.Item label="Automotive" value="Automotive" />
                            <Picker.Item label="Home And Garden" value="Home And Garden" />
                            <Picker.Item label="Pets" value="Pets" />
                        </Picker>
                    </View>
                </PanelSection>
                <TagInput />
                <PanelSection>
                    <Button onPress={() => Actions.locationPanel()}>
                        Location
                    </Button>
                </PanelSection>                
                <PanelSection>
                    <Button onPress={() => Actions.picturePanel()}>
                        Add picture 
                    </Button>
                   
                </PanelSection>
            </View>
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
    const { title, description, category, image, tags } = state.adForm;
    //console.log(tags);
    return { title, description, category, image, tags };
};


export default connect(mapStateToProps, { adUpdate, getDefaultImage, setMarkerCoords })(AdForm);
