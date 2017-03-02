import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAe0UXpn2mj3inOneYqQ43u2QOT5RvD9xM',
      authDomain: 'manager-992e1.firebaseapp.com',
      databaseURL: 'https://manager-992e1.firebaseio.com',
      storageBucket: 'manager-992e1.appspot.com',
      messagingSenderId: '341429528131'
    };
    firebase.initializeApp(config);
  }
  render() { 
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <Router />
          </View>
        </Provider>
      );
  }
}

export default App;
