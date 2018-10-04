import _ from 'lodash';
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { Picker, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { 
    adsFetch, 
    sortByChanged, 
    adsChangedOrder, 
    showCategoryPanel,
    sortByCategoryChanged
} from '../actions';
import Ad from './Ad';
import { CategoryPanel } from './common';

class AdList extends Component {    
    componentWillMount() {
        console.log('weszlo');
        this.props.adsFetch();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {        
        console.log('weszloTu');
        if (this.props.selectedCategory !== nextProps.selectedCategory) {
            this.showOnlyFromCategory(nextProps.selectedCategory);
        }
        console.log(nextProps.ads);
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

    onCategoryPanelChange(value) {
        this.props.sortByCategoryChanged(value);
    }

    sortFromNewest(array) {
        return array.sort((a, b) => {
          return b.publishDate < a.publishDate ? -1
               : b.publishDate > a.publishDate ? 1
               : 0;
        });
    }

    sortFromOldest(array) {
    return array.sort((a, b) => {
        return b.publishDate > a.publishDate ? -1
            : b.publishDate < a.publishDate ? 1
            : 0;
        });
    }

    sortArrayAsc(array) {
    return array.sort((a, b) => {
        return b.title > a.title ? -1
            : b.title < a.title ? 1
            : 0;
        });
    }

    sortArrayDesc(array) {
    return array.sort((a, b) => {
        return b.title < a.title ? -1
            : b.title > a.title ? 1
            : 0;
        });
    }     
      
    showOnlyFromCategory(category) {
        if (category !== '') {
            this.props.adsChangedOrder(this.props.originalAds.filter((ad) => ad.category === category));
        } else {
            this.props.adsChangedOrder(this.props.originalAds);
        }
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
                    onChangeServicesAndCompanies={this.onCategoryPanelChange.bind(this, 'Services And Companies')}
                    onChangeFashion={this.onCategoryPanelChange.bind(this, 'Fashion')}
                    onChangeSportAndHobby={this.onCategoryPanelChange.bind(this, 'Sport And Hobby')}
                    onChangeElectronics={this.onCategoryPanelChange.bind(this, 'Electronics')}
                    onChangeAutomotive={this.onCategoryPanelChange.bind(this, 'Automotive')}
                    onChangeHomeAndGarden={this.onCategoryPanelChange.bind(this, 'Home And Garden')}
                    onChangePets={this.onCategoryPanelChange.bind(this, 'Pets')}
                    onChangeAll={this.onCategoryPanelChange.bind(this, '')}
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
            <View style={{ flex: 1 }}>
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
                            selectedValue={this.props.sortBy}
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
                style={{ flex: 1 }}
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
    const ads = _.map(state.ads.ads, (val, uid) => {
      return { ...val, uid };
    });
    const originalAds = _.map(state.ads.originalAds, (val, uid) => {
        return { ...val, uid };
      });
    const { categoryPanel, sortBy, selectedCategory } = state.sortOrder;
    return { ads, originalAds, sortBy, categoryPanel, selectedCategory }; 
  };

  export default connect(mapStateToProps, { 
      adsFetch, 
      sortByChanged, 
      adsChangedOrder, 
      showCategoryPanel,
      sortByCategoryChanged
})(AdList);
