import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import NewFriendBody from './NewFriendBody';
import NewFriendHeader from './NewFriendHeader';

export default class MatchDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NewFriendBody />
        <NewFriendHeader />
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