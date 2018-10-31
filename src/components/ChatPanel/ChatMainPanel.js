import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, TouchableOpacity, Text } from 'react-native';
import { Panel, PanelSection, Button } from '../common';
import { fetchRecentUsers } from '../../actions';

class ChatMainPanel extends Component {
    componentWillMount() {        
        this.props.fetchRecentUsers();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {  
        if (this.props.recentUsers.length === 0) {
            this.props.fetchRecentUsers();
        }
        this.createDataSource(nextProps);
    }

    createDataSource({ recentUsers }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(recentUsers);
    }

    renderRow(user) {        
        const { personStyle } = styles;
        return (
            <TouchableOpacity onPress={() => Actions.chatView({ contactUser: user })}>
                <Text style={personStyle}>{`${user.firstName} ${user.lastName}`}</Text>
            </TouchableOpacity>
        );
    }

    render() {    
        const { textStyle } = styles;
        return (
            <Panel>
            <PanelSection>
                <Button onPress={() => Actions.allUsersList()}>
                    Start chat with another user
                </Button>
            </PanelSection>
                <PanelSection>
                    <Text style={textStyle}>Recent Conversations</Text>
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

const styles = {
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 15
    }, 
    personStyle: {
        fontSize: 18, 
        paddingLeft: 15,  
        color: '#1097D8'
    }
};

const mapStateToProps = (state) => {
    const { recentUsers } = state.chat;
    return { recentUsers };
};
export default connect(mapStateToProps, { fetchRecentUsers })(ChatMainPanel);
