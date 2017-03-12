import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import FriendListHeader from './FriendListHeader';
import FriendListBody from './FriendListBody';

export default class FriendList extends Component {
  constructor(props) {
    super(props);

    // this._back = this._back.bind(this);
    this._confirm = this._confirm.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._removeFriend = this._removeFriend.bind(this);
    this._exists = this._exists.bind(this);

    this.state = {
      selectedFriends: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FriendListHeader onBack={this.props.onBack} onConfirm={this._confirm} />
        <FriendListBody friends={this.props.friends} onSelect={this._addFriend} onUnselect={this._removeFriend} />
      </View>
    );
  }

  // _back() {
  //   this.props.onBack();
  // }

  _confirm() {
    this.props.onConfirm(this.state.selectedFriends);
  }

  _addFriend(friend) {
    if (this._exists(friend) === -1)
      this.setState({ selectedFriends: this.state.selectedFriends.concat([friend]) })
  }

  _removeFriend(friend) {
    let pos = this._exists(friend);

    if (pos > -1) {
      let newList = this.state.selectedFriends.slice();
      newList.slice(pos, 1);
      this.setState({ selectedFriends: newList });
    }
  }

  _exists(friend) {
    for (let i = 0; i < this.state.selectedFriends.length; i++) {
      if (this.state.selectedFriends[i].id === friend.id)
        return i;
    }

    return -1;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  }
});