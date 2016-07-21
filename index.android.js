import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  Image
} from 'react-native';

var Dispatcher = require('./src/dispatcher/Dispatcher');

class yojuego extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <Text style={styles.instructions}>
          prueba
        </Text>
        <TouchableOpacity
          onPress = {this._onPressButton.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Press me!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  triggerButtonPressedAction: function(opacity) {
    Dispatcher.handleViewAction({
      actionType: AppConstants.DEMO_BUTTON_PRESSED,
      payload: opacity
    });
  }

  _onPressButton() {
    this.setState({opacity: 0.5});
    alert('Action: Button Pressed');
    triggerButtonPressedAction(0.5);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  button: {
    width: 120,
    height: 120,
    top: 0,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#da766b',
    backgroundColor: '#e01a3c',
    borderWidth: 5,
    justifyContent: 'center',
    flex: 1,
    borderStyle: 'dotted',
  },
  buttonText: {
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('yojuego', () => yojuego);
