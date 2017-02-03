import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import NewFriendBody from './NewFriendBody';
import NewFriendHeader from './NewFriendHeader';

export default class NewFriend extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NewFriendHeader />
        <NewFriendBody />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});