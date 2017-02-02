import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import GroupDetailBody from './GroupDetailBody';
import GroupDetailHeader from './GroupDetailHeader';

export default class GroupDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GroupDetailHeader />
        <GroupDetailBody />
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