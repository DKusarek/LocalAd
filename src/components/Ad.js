import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Panel, PanelSection } from './common';

class Ad extends Component {
    render() {
        const { title, description, category, image } = this.props.ad;
        
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
                    {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
        paddingLeft: 15
    }
};

export default Ad;
