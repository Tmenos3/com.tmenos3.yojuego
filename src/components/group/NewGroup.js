import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import NewGroupBody from './NewGroupBody';
import NewGroupHeader from './NewGroupHeader';

export default class NewGroup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NewGroupHeader />
        <NewGroupBody friends={this.props.friends}/>
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