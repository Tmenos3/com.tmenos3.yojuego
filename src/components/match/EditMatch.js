import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import EditMatchBody from './EditMatchBody';
import EditMatchHeader from './EditMatchHeader';

export default class EditMatch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <EditMatchHeader match={this.props.match} />
        <EditMatchBody match={this.props.match} />
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