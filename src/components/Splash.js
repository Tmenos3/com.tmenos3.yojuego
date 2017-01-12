import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.text}>
          YoJuego!! ;)
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});