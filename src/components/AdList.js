import _ from 'lodash';
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { Picker, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { adsFetch, sortByChanged, adsChangedOrder, showCategoryPanel } from '../actions';
import Ad from './Ad';
import { CategoryPanel } from './common';

class AdList extends Component {    
    componentWillMount() {
        this.props.adsFetch();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    onSortByChange(value) {
        this.props.sortByChanged(value);
        switch (value) {
            case 'AlphabeticallyAZ':
                this.props.adsChangedOrder(this.sortArrayAsc(this.props.ads));
                break;
            case 'AlphabeticallyZA':
                this.props.adsChangedOrder(this.sortArrayDesc(this.props.ads));
                break;
            case 'Newest':
            console.log(this.sortFromNewest(this.props.ads));
            console.log(this.sortFromOldest(this.props.ads));
                this.props.adsChangedOrder(this.sortFromNewest(this.props.ads));
                break;
            case 'Oldest':
                this.props.adsChangedOrder(this.sortFromOldest(this.props.ads));
                break;
            case 'Category':
                this.props.showCategoryPanel();
                break;
            default:
                break;
        }
    }

    sortFromNewest(array) {
        return array.sort((a, b) => {
          return b.publishDate < a.publishDate ? -1
               : b.publishDate > a.publishDate ? 1
               : 0
        });
      }

      sortFromOldest(array) {
        return array.sort((a, b) => {
          return b.publishDate > a.publishDate ? -1
               : b.publishDate < a.publishDate ? 1
               : 0
        });
      }

    sortArrayAsc(array) {
        return array.sort((a, b) => {
          return b.title > a.title ? -1
               : b.title < a.title ? 1
               : 0
        });
      }

      sortArrayDesc(array) {
        return array.sort((a, b) => {
          return b.title < a.title ? -1
               : b.title > a.title ? 1
               : 0
        });
      }    
        
    createDataSource({ ads }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(ads);
    }

    createDataSourceTable(ads) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(ads);
    }

    renderCategoryPanel() {
        if (this.props.categoryPanel) {
            return (
                <CategoryPanel 
                    
                />
            );
        }
    }

    renderRow(ad) {
        return <Ad ad={ad} />;
    }

    render() {
        const { mainViewStyle, inputStyle, containerStyle, pickerStyle } = styles;
        return (
            <View>
                <View style={mainViewStyle}>
                    <SearchBar
                        showLoading
                        lightTheme
                        inputStyle={inputStyle}
                        containerStyle={containerStyle}
                        placeholderTextColor={'#ddd'}
                        placeholder='Search' 
                    />
                    <View style={pickerStyle}>
                        <Picker                            
                            selectedValue={this.props.sortOrder.sortBy}
                            onValueChange={value => this.onSortByChange(value)}       
                            mode='dropdown'                  
                        >                    
                            <Picker.Item label="Sort by" value="" />
                            <Picker.Item label="A to Z" value="AlphabeticallyAZ" />
                            <Picker.Item label="Z to A" value="AlphabeticallyZA" />
                            <Picker.Item label="Newest first" value="Newest" />
                            <Picker.Item label="Oldest first" value="Oldest" />
                            <Picker.Item label="By Category" value="Category" />
                        </Picker>
                    </View>
                </View>
                <View>
                    {this.renderCategoryPanel()}
                </View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const styles = {
    mainViewStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1, 
        borderRadius: 5,
        borderColor: '#ddd'
    },
    inputStyle: {
        backgroundColor: 'white'
    },
    containerStyle: {
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 5,
        flex: 0.7,
        height: 60,        
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
    },
    pickerStyle: {
        flex: 0.3,
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 5,
        borderColor: '#ddd',
    }
};

const mapStateToProps = state => {
    console.log(state);
    const ads = _.map(state.ads, (val, uid) => {
      return { ...val, uid };
    });
    const sortOrder = state.sortOrder;
    const { categoryPanel } = state.sortOrder;
    return { ads, sortOrder, categoryPanel }; 
  };

  export default connect(mapStateToProps, { adsFetch, sortByChanged, adsChangedOrder, showCategoryPanel })(AdList);
