import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

export default class App extends Component {
  componentWillMount() {
    console.ignoredYellowBox = [
      'Setting a timer'
  ];
  
    firebase.initializeApp({
      apiKey: 'AIzaSyCiSq5R0aWAG9lfBz5iYSQSMohv9Z2MDbM',
      authDomain: 'localad-53d66.firebaseapp.com',
      databaseURL: 'https://localad-53d66.firebaseio.com',
      projectId: 'localad-53d66',
      storageBucket: 'localad-53d66.appspot.com',
      messagingSenderId: '754386758120'
    });
}   

  render() {
    return (
      <Provider 
      store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
      >            
          <Router />
      </Provider>
      );
  }
}
