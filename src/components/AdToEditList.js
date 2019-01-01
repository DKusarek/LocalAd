import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { 
    adsFetchEdit
} from '../actions';
import AdToEdit from './AdToEdit';

class AdToEditList extends Component {    
    componentWillMount() {
        this.props.adsFetchEdit();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {  
        this.createDataSource(nextProps);
    }

    createDataSource({ ads }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(ads);
    }
  
    renderRow(ad) {
        return <AdToEdit ad={ad} />;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                style={{ flex: 1 }}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const ads = _.map(state.ads.adsToEdit, (val, uid) => {
      return { ...val, uid };
    });
    return { ads }; 
  };

  export default connect(mapStateToProps, { 
    adsFetchEdit
})(AdToEditList);
