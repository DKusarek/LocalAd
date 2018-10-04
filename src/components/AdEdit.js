import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adUpdate, adSave } from '../actions';
import { Panel, PanelSection, Button } from './common';
import AdForm from './AdForm';

class AdEdit extends Component {
    componentWillMount() {
        _.each(this.props.ad, (value, prop) => {
            this.props.adUpdate({ prop, value });
          });
    }

    onButtonPress() {
        const { title, description, category, image, adUuid } = this.props;
        this.props.adSave({ 
            title, 
            description, 
            category: category || 'Services And Companies',
            image,
            adUuid,
            uid: this.props.ad.uid
        });
    }

    render() {
        return (
            <Panel>
                <AdForm {...this.props} />
                <PanelSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Edit Ad
                    </Button>
                </PanelSection>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, description, category, image, adUuid } = state.adForm;
    return { title, description, category, image, adUuid };
};

export default connect(mapStateToProps,
    { adUpdate, adSave })(AdEdit);
