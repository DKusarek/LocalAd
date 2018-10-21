import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adUpdate, adCreate } from '../actions';
import { Panel, PanelSection, Button } from './common';
import AdForm from './AdForm';

class AdCreate extends Component {
    onButtonPress() {
        const { title, description, category, image } = this.props;
        this.props.adCreate({ 
            title, 
            description, 
            category: category || 'Services And Companies',
            image 
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
    return { title, description, category, image };
};

export default connect(mapStateToProps,
    { adUpdate, adCreate })(AdCreate);
