import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

export default class FullActivityIndicator extends Component {
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} size='large' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  }
});