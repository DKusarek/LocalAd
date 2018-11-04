import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adUpdate, adCreate, clearForm } from '../actions';
import { Panel, PanelSection, Button } from './common';
import AdForm from './AdForm';

class AdCreate extends Component {
    componentDidMount() {
        this.props.clearForm();
    }

    onButtonPress() {
        const { title, description, category, image, markerCoords, tags } = this.props;
        this.props.adCreate({ 
            title, 
            description, 
            category: category || 'Services And Companies',
            image,
            markerCoords,
            tags
        });
    }

    render() {
        return (
            <Panel>
                <AdForm {...this.props} />
                <PanelSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Publish Ad
                    </Button>
                </PanelSection>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, description, category, image } = state.adForm;
    const { markerCoords } = state.location;
    const { tags } = state.tags;
    return { title, description, category, image, markerCoords, tags };
};

export default connect(mapStateToProps,
    { adUpdate, adCreate, clearForm })(AdCreate);
