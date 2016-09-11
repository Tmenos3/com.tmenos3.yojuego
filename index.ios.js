import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import App from './src/App';

class YoJuego extends Component {
  render() {
    return (
      <View style={{ paddingTop: 20, flex: 1 }}>
        <App/>
      </View> 
    );
  }
}

AppRegistry.registerComponent('YoJuego', () => YoJuego);
