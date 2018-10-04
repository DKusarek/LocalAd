import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { getPicture, updatePicture, getDefaultImage } from '../actions';
import { Panel, PanelSection } from './common';

class Ad extends Component {
    componentWillMount() {
        console.log('weszlo');
        this.props.getDefaultImage();
        this.props.getPicture(this.props.ad.adUuid);
    }

    componentWillReceiveProps(nextProps) {  
        console.log('weszloTu');
        if (this.props.ad.image !== nextProps.ad.image) {
            console.log('i tu');
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
               <Image source={{ uri: obj.url }} style={{ width: 200, height: 200 }} />
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
                        <Text style={styles.titleStyle}>
                            {category}
                        </Text>
                    </PanelSection>
                    <PanelSection>
                        {this.renderImage()}                    
                        <Text style={styles.descriptionStyle}>
                            {description}
                        </Text>
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

    },
    descriptionStyle: {
        fontSize: 12, 
        padding: 5  
    }
};

const mapStateToProps = (state) => {
    const { image } = state.picture;
    return { image };
};

export default connect(mapStateToProps, { getPicture, updatePicture, getDefaultImage })(Ad);
