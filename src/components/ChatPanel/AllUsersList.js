import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Panel, PanelSection, Button } from '../common';
import { fetchAllUsers } from '../../actions';

class AllUsersList extends Component {

    componentWillMount() {        
        this.props.fetchAllUsers();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {  
        this.createDataSource(nextProps);
    }

    createDataSource({ allUsers }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(allUsers);
    }

    renderRow(user) {
        return (            
            <Button onPress={() => Actions.chatView({ contactUser: user })}>
                {`${user.firstName} ${user.lastName}`}
            </Button>
        );
    }

    render() {        
        return (
            <Panel>
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
    const { allUsers } = state.chat;
    return { allUsers };
};
export default connect(mapStateToProps, { fetchAllUsers })(AllUsersList);
