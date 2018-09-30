import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { adsFetch, } from '../actions';
import Ad from './Ad';

class AdList extends Component {
    componentWillMount() {
        this.props.adsFetch();
        this.createDataSource(this.props);
    }

    //lifecycle method that will be called whenever we are about to receive a new set of props
    componentWillReceiveProps(nextProps) {
        //nextProps are the next set of props that this component
        // will be rendered with
        //this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource({ ads }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(ads);
    }

    renderRow(ad) {
        return <Ad ad={ad} />;
    }

    render() {
        return (
            <View>
                
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const ads = _.map(state.ads, (val, uid) => {
      return { ...val, uid };
    });
  
    return { ads };
  };

  export default connect(mapStateToProps, { adsFetch })(AdList);
