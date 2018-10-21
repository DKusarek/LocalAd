import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, TouchableOpacity, Text } from 'react-native';
import { Panel, PanelSection, Button } from '../common';
import { addMessages, fetchMessges } from '../../actions';

class RecentConversations extends Component {

    renderRow(user) {
        return (
            <TouchableOpacity>
                <Text>
                    {user.firstName + ' ' + user.lastName}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {        
        return (
            <Panel>
                <PanelSection>
                    <Button>
                        Start chat with another user
                    </Button>
                </PanelSection>
                <PanelSection>
                <ListView
                    style={{ flex: 1 }}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                </PanelSection>
            </Panel>
        );
      }
}

const mapStateToProps = (state) => {
    const { messages, fetching } = state.chat;
    return { messages, fetching };
};
export default connect(mapStateToProps, { addMessages, fetchMessges })(RecentConversations);
