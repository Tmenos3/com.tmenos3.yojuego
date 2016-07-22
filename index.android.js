import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

var App = require('./src/App');

class yojuego extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('yojuego', () => yojuego);
