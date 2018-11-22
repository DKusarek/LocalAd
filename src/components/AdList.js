import _ from 'lodash';
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { Picker, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Location } from 'expo';
import { 
    adsFetch, 
    sortByChanged, 
    adsChangedOrder, 
    showCategoryPanel,
    showLocationPanel,
    sortByCategoryChanged,
    sortByLocationChanged,
    searchAd,
    cityNameChangedList
} from '../actions';
import Ad from './Ad';
import { CategoryPanel, LocationPanel } from './common';

class AdList extends Component {    
    componentWillMount() {
        this.props.adsFetch();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {  
        if (this.props.selectedCategory !== nextProps.selectedCategory) {
            this.showOnlyFromCategory(nextProps.selectedCategory);
        }
        if (this.props.selectedDistance !== nextProps.selectedDistance) {
            this.showOnlyForDistance(nextProps.selectedDistance, nextProps.cityName);
        }
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
            case 'Location':
                this.props.showLocationPanel();
                break;
            default:
                break;
        }
    }

    onCityNameChanged(text) {
        this.props.cityNameChangedList(text);
    }

    onCategoryPanelChange(value) {
        this.props.sortByCategoryChanged(value);
    }

    onLocationPanelChange(value) {
        this.props.sortByLocationChanged(value);
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
            this.props.adsChangedOrder(
                this.props.originalAds.filter((ad) => ad.category === category));
        } else {
            this.props.adsChangedOrder(this.props.originalAds);
        }
    }

    showOnlyForDistance(distance, cityName) {
        if (distance === 'All' ) {
            this.props.adsChangedOrder(this.props.originalAds);
        } else if (cityName !== '') {
            Location.geocodeAsync(this.props.cityName)
            .then(result => {
                this.props.adsChangedOrder(
                this.props.originalAds.filter((ad) => 
                    ad.location !== undefined && ad.location.longitude !== undefined && ad.location.latitude !== undefined &&
                    ad.location.latitude < result[0].latitude + (Number(distance) / 110.574) &&
                    ad.location.latitude >= result[0].latitude - (Number(distance) / 110.574) &&
                    ad.location.longitude < result[0].longitude + (Number(distance) / (111.320 * Math.cos(result[0].latitude))) &&
                    ad.location.longitude >= result[0].longitude - (Number(distance) / (111.320 * Math.cos(result[0].latitude)))));
            })
            .catch(error => console.log(error));            
        } else {
            Location.getCurrentPositionAsync()
            .then((result) => {
                this.props.adsChangedOrder(
                    this.props.originalAds.filter((ad) => 
                        ad.location !== undefined && ad.location.longitude !== undefined && ad.location.latitude !== undefined &&
                        ad.location.latitude < result.coords.latitude + (Number(distance) / 110.574) &&
                        ad.location.latitude >= result.coords.latitude - (Number(distance) / 110.574) &&
                        ad.location.longitude < result.coords.longitude + (Number(distance) / (111.320 * Math.cos(result.coords.latitude))) &&
                        ad.location.longitude >= result.coords.longitude - (Number(distance) / (111.320 * Math.cos(result.coords.latitude)))));
            })
            .catch((error) => console.log(error));    
        }
    }

    createDataSource({ ads, filteredAds, searchText }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        if (searchText) {
            this.dataSource = ds.cloneWithRows(filteredAds);            
        } else {
            this.dataSource = ds.cloneWithRows(ads);  
        }
    }

    handleSearch(text) {
        var adTitles = [];
        var adTags = [];
        this.props.ads.forEach(element => {
            adTitles.push(element.title);
            if (element.tags !== undefined) {
                element.tags.forEach(tag => {
                    adTags.push(tag);
                });
            }
        });
        this.props.searchAd(text, adTitles, adTags);
    }

    renderCategoryPanel() {
        if (this.props.categoryPanel) {
            return (
                <CategoryPanel 
                    onChangeServicesAndCompanies={
                        this.onCategoryPanelChange.bind(this, 'Services And Companies')}
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

    renderLocationPanel() {
        if (this.props.locationPanel) {
            return (
                <LocationPanel 
                    value={this.props.cityName}
                    onChangeText={this.onCityNameChanged.bind(this)}    
                    onChange0={this.onLocationPanelChange.bind(this, '0')}
                    onChange5={this.onLocationPanelChange.bind(this, '5')}
                    onChange10={this.onLocationPanelChange.bind(this, '10')}
                    onChange25={this.onLocationPanelChange.bind(this, '25')}
                    onChange50={this.onLocationPanelChange.bind(this, '50')}
                    onChange75={this.onLocationPanelChange.bind(this, '75')}                    
                    onChange100={this.onLocationPanelChange.bind(this, '100')}
                    onChangeAll={this.onLocationPanelChange.bind(this, 'All')}
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
                        onChangeText={this.handleSearch.bind(this)}
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
                            <Picker.Item label="By Location" value="Location" />
                        </Picker>
                    </View>
                </View>
                <View>
                    {this.renderCategoryPanel()}                    
                </View>
                <View>
                    {this.renderLocationPanel()}                    
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
    const filteredAds = _.map(state.ads.filteredAds, (val, uid) => {
        return { ...val, uid };
    });

    const searchText = state.ads.searchText;
    const { 
        categoryPanel, 
        locationPanel, 
        sortBy, 
        selectedCategory, 
        cityName, 
        selectedDistance 
    } = state.sortOrder;
    return { 
        ads, 
        originalAds, 
        filteredAds, 
        searchText, 
        sortBy, 
        categoryPanel, 
        locationPanel, 
        selectedCategory,
        cityName, 
        selectedDistance   
    }; 
  };

  export default connect(mapStateToProps, { 
      adsFetch, 
      sortByChanged, 
      adsChangedOrder, 
      showCategoryPanel,
      showLocationPanel,
      sortByCategoryChanged,
      sortByLocationChanged,
      searchAd,
      cityNameChangedList
})(AdList);
