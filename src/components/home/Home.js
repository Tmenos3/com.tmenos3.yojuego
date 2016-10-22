import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Header from './Header';
import Body from './Body';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <Body/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  }
});

module.exports = Home;
