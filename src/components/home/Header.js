import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default class Header extends Component {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009900',
    height: 60
  }
});