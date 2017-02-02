import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import FriendDetailBody from './FriendDetailBody';
import FriendDetailHeader from './FriendDetailHeader';

export default class FriendDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FriendDetailHeader />
        <FriendDetailBody />
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