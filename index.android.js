import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native'
import App from './src/App';
import CompletePlayerProfileInfo from './src/components/CompletePlayerProfileInfo';

class YoJuego extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('YoJuego', () => YoJuego);
