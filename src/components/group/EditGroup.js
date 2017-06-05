import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import EditGroupBody from './EditGroupBody';
import EditGroupHeader from './EditGroupHeader';

export default class EditGroup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <EditGroupHeader group={this.props.group} />
        <EditGroupBody group={this.props.group} />
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