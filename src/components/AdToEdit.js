import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getPicture, getDefaultImage, clearCityName } from '../actions';
import { Panel, PanelSection } from './common';

class AdToEdit extends Component {
    componentWillMount() {
    }

    onRowPress() {
        this.props.clearCityName();
        Actions.adEdit({ ad: this.props.ad });
    }

    render() {
        const { title } = this.props.ad;
        
        return (
                <Panel>
                    <PanelSection>
                        <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                            <Text style={styles.titleStyle}>
                                {title}
                            </Text>
                        </TouchableOpacity>
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

export default connect(mapStateToProps, { getPicture, getDefaultImage, clearCityName })(AdToEdit);
