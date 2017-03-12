import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import CreateMatchBody from './CreateMatchBody';
import CreateMatchHeader from './CreateMatchHeader';

export default class CreateMatch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CreateMatchHeader />
        <CreateMatchBody />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  }
});