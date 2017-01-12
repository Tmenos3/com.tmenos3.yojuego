import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MatchDetailBody from './MatchDetailBody';
import MatchDetailHeader from './MatchDetailHeader';

export default class MatchDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: props.match
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MatchDetailHeader match={this.state.match} />
        <MatchDetailBody match={this.state.match} />
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