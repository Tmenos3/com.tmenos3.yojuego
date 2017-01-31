import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MatchDetailBody from './MatchDetailBody';
import MatchDetailHeader from './MatchDetailHeader';

export default class MatchDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MatchDetailHeader />
        <MatchDetailBody />
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