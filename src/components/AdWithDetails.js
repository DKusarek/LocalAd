import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getPicture, updatePicture, contactWithAdvertaiser } from '../actions';
import { Panel, PanelSection, Button, Inform } from './common';
import { Actions } from 'react-native-router-flux';

class AdWithDetails extends Component {
    state = { showModal: false, showModal2: false };

    componentWillMount() {
        this.props.getPicture(this.props.ad.adUuid);
    }

    componentWillReceiveProps(nextProps) {  
        if (this.props.ad.image !== nextProps.ad.image) {
            this.props.updatePicture(nextProps.ad.adUuid);
        }
    }

    onOK() {
        this.setState({ showModal: false, showModal2: false });
    }

    onContactAdvertiserPress() {
        const { currentUser } = firebase.auth();
        if (currentUser.uid === this.props.ad.owner) {
            this.setState({ showModal: !this.state.showModal });           
        } else {
            this.props.contactWithAdvertaiser(this.props.ad.owner);
        }
    }

    onShowLocationPress() {
        const { location } = this.props.ad;
        if (location === undefined) {
            this.setState({ showModal2: !this.state.showModal2 });   
        } else {
            Actions.staticMap({ location });
        }
    }

    renderImage() {   
        if (this.props.image) {
            const obj = this.props.image.find((image) => { 
                    return image.adUuid === this.props.ad.adUuid; 
                });
            if (obj != null) {
            return (
               <Image source={{ uri: obj.url }} style={{ width: 340, height: 262 }} />
            );
            }
        }  
    }

    render() {
        const { title, description, category } = this.props.ad;
        
        return (
            <Panel>
                    <PanelSection>
                        <Text style={styles.titleStyle}>
                            {title}
                        </Text>
                    </PanelSection>
                    <PanelSection>                            
                        {this.renderImage()}   
                    </PanelSection>
                    <PanelSection>
                        <View>  
                            <Text style={styles.categoryStyle}>
                                {category}
                            </Text>             
                            <Text style={styles.descriptionStyle}>
                                {description}
                            </Text>
                        </View>  
                    </PanelSection>
                    <PanelSection>
                        <Button onPress={this.onContactAdvertiserPress.bind(this)}>
                            Contact with advertiser
                        </Button>
                        <Inform
                            visible={this.state.showModal}
                            onOK={this.onOK.bind(this)}
                        >
                            You are the advertiser
                        </Inform>
                    </PanelSection>
                    <PanelSection>
                        <Button onPress={this.onShowLocationPress.bind(this)}>
                            Show Location
                        </Button>
                        <Inform
                            visible={this.state.showModal2}
                            onOK={this.onOK.bind(this)}
                        >
                            Location not available
                        </Inform>
                    </PanelSection>
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
        padding: 5
    },
    descriptionView: {        
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: Dimensions.get('window').width - 10, 
        height: 100
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
};

const mapStateToProps = (state) => {
    const { image } = state.picture;
    return { image };
};

export default connect(mapStateToProps, 
    { getPicture, updatePicture, contactWithAdvertaiser })(AdWithDetails);
