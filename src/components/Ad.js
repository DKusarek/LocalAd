import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getPicture, updatePicture } from '../actions';
import { Panel, PanelSection } from './common';

class Ad extends Component {
    componentWillMount() {
        this.props.getPicture(this.props.ad.adUuid);
    }

    componentWillReceiveProps(nextProps) {  
        if (this.props.ad.image !== nextProps.ad.image) {
            this.props.updatePicture(nextProps.ad.adUuid);
        }
    }

    onAdPress() {
        const user = firebase.auth().currentUser;
        if (user) {
            Actions.adWithDetails({ ad: this.props.ad });
        } else {
            Actions.adWithDetailsGuest({ ad: this.props.ad });
        }       
    }

    renderImage() {   
        if (this.props.image) {
            const obj = this.props.image.find((image) => { 
                    return image.adUuid === this.props.ad.adUuid; 
                });
            if (obj != null) {
                return (
                <Image source={{ uri: obj.url }} style={{ width: 100, height: 75 }} />
                );
            }
        }  
    }

    render() {
        const { title, description, category } = this.props.ad;
        
        return (
                <Panel>
                    <TouchableOpacity onPress={this.onAdPress.bind(this)}>
                        <PanelSection>
                            <Text style={styles.titleStyle}>
                                {title}
                            </Text>
                        </PanelSection>
                        <PanelSection>
                            {this.renderImage()}   
                            <View>  
                                <Text style={styles.categoryStyle}>
                                    {category}
                                </Text>             
                                <Text style={styles.descriptionStyle} numberOfLines={3}>
                                    {description}
                                </Text>
                            </View>  
                        </PanelSection>
                    </TouchableOpacity>
                </Panel>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18, 
        fontWeight: 'bold',
        paddingLeft: 15        
    },
    categoryStyle: {
        fontSize: 12,
        color: '#1097D8',
        padding: 5  
    },
    descriptionStyle: {
        fontSize: 12, 
        padding: 5,
        marginRight: 100
    },
    descriptionView: {        
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
};

const mapStateToProps = (state) => {
    const { image } = state.picture;
    return { image };
};

export default connect(mapStateToProps, { getPicture, updatePicture })(Ad);
