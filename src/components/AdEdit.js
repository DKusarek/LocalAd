import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adUpdate, adSave, adDelete } from '../actions';
import { Panel, PanelSection, Button, Confirm } from './common';
import AdForm from './AdForm';

class AdEdit extends Component {
    state = { showModal: false };

    componentWillMount() {
        _.each(this.props.ad, (value, prop) => {
            this.props.adUpdate({ prop, value });
          });
    }

    onEditButtonPress() {
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

    onAccept() {
        const { uid, adUuid } = this.props.ad;
        this.props.adDelete(uid, adUuid);
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Panel>
                <AdForm {...this.props} />
                <PanelSection>
                    <Button onPress={this.onEditButtonPress.bind(this)}>
                        Edit Ad
                    </Button>
                </PanelSection>
                <PanelSection>
                    <Button 
                        onPress={() => this.setState({ showModal: !this.state.showModal })}
                    >
                        Delete Ad
                    </Button>
                </PanelSection>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this? 
                </Confirm>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, description, category, image, adUuid } = state.adForm;
    return { title, description, category, image, adUuid };
};

export default connect(mapStateToProps,
    { adUpdate, adSave, adDelete })(AdEdit);
