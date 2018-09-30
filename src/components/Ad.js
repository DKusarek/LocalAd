import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { getPicture } from '../actions';
import { Panel, PanelSection } from './common';

class Ad extends Component {
    componentWillMount() {
        this.props.getPicture(this.props.ad.title);
    }

    renderImage() {   
        if (this.props.image) {
            const obj = this.props.image.find((image) => { return image.title === this.props.ad.title; });
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
                        <Text style={styles.titleStyle}>
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
        paddingLeft: 15,
        
    }
};

const mapStateToProps = (state) => {
    const { image } = state.picture;
    return { image };
};

export default connect(mapStateToProps, { getPicture })(Ad);
