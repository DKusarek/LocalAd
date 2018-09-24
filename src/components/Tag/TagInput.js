import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { tagAdd, tagNameChanged, tagDelete, adTagAdd, adTagDelete } from '../../actions';
import { Button, Input, Panel, PanelSection } from '../common';
import Tag from './Tag';

class TagInput extends Component {
    onTagNameChange(text) {
        this.props.tagNameChanged(text);
    }

    onButtonAddPress() {
        this.props.tagAdd(this.props.tagName);
        this.props.adTagAdd(this.props.tagName);
    }

    deleteTag(tagName) {
        this.props.tagDelete(tagName[0]);
        this.props.adTagDelete(tagName[0]);
    }

    render() {
        return (
            <View>
                <PanelSection>
                    <Input
                        style={styles.inputStyle}
                        label="Tags"
                        value={this.props.tagName}
                        onChangeText={this.onTagNameChange.bind(this)}
                    />
                    <Button 
                        style={styles.buttonStyle}
                        onPress={this.onButtonAddPress.bind(this)}
                    >
                        Add
                    </Button>
                </PanelSection>
                <View style={{ backgroundColor: '#fff' }} >
                    {this.props.tags.map((y) => {
                        return (<Tag 
                            onPress={this.deleteTag.bind(this, [y])} 
                            key={y} 
                            tagName={y} 
                        />);
                    })}
                </View>
                </View>
        );
    }
}

const styles= {
    buttonStyle: {
        width: 50, 
        height: 50, 
        flex: 0,
        marginTop: 30
    },
    inputStyle: {
        flex: 5
    }
};


const mapStateToProps = (state) => {
    const { tags, tagName, deleted } = state.tags;
    return { tags, tagName, deleted };
};

export default connect(mapStateToProps, { 
    tagAdd, tagNameChanged, tagDelete, adTagAdd, adTagDelete
})(TagInput);
