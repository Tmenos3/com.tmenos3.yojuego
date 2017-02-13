import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import FriendshipRequestBody from './FriendshipRequestBody';
import FriendshipRequestHeader from './FriendshipRequestHeader';

export default class FriendshipRequest extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <FriendshipRequestHeader />
        <FriendshipRequestBody friendshipRequest={this.props.friendshipRequest}/>
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