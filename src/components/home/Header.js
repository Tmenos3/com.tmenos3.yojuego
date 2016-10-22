import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#009900',
    height: 60
  }
});

module.exports = Header;
