import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { getPicture, updatePicture } from '../actions';
import { Panel, PanelSection } from './common';

class AdWithDetailsGuest extends Component {
    componentWillMount() {
        this.props.getPicture(this.props.ad.adUuid);
    }

    componentWillReceiveProps(nextProps) {  
        if (this.props.ad.image !== nextProps.ad.image) {
            this.props.updatePicture(nextProps.ad.adUuid);
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

    renderTags() {         
        var tagLine = '';
        if (this.props.ad.tags !== undefined) {
            this.props.ad.tags.forEach(tag => {
                tagLine += `${tag} `;
            });
        }
        if (tagLine !== '') {
            return (
                <Text style={styles.tagStyle}>{tagLine}</Text>
            );
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
                                {this.renderTags()}
                            </View>  
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
    tagStyle: {
        fontSize: 12,
        color: '#9fadc4',
        padding: 5  
    }
};

const mapStateToProps = (state) => {
    const { image } = state.picture;
    return { image };
};

export default connect(mapStateToProps, { getPicture, updatePicture })(AdWithDetailsGuest);
