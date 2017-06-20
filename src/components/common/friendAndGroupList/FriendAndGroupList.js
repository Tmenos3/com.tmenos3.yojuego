import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import FriendAndGroupListHeader from './FriendAndGroupListHeader';
import FriendAndGroupListBody from './FriendAndGroupListBody';

export default class FriendAndGroupList extends Component {
  constructor(props) {
    super(props);

    this._confirm = this._confirm.bind(this);
    this._addFriend = this._addFriend.bind(this);
    this._removeFriend = this._removeFriend.bind(this);
    this._addGroup = this._addGroup.bind(this);
    this._removeGroup = this._removeGroup.bind(this);
    this._existsFriend = this._existsFriend.bind(this);
    this._existsGroup = this._existsGroup.bind(this);

    this.state = {
      selectedFriends: [],
      selectedGroups: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FriendAndGroupListHeader onBack={this.props.onBack} onConfirm={this._confirm} />
        <FriendAndGroupListBody
          friends={this.props.friends}
          groups={this.props.groups}
          onSelectFriend={this._addFriend}
          onUnselectFriend={this._removeFriend}
          onSelectGroup={this._addGroup}
          onUnselectGroup={this._removeGroup} />
      </View>
    );
  }

  _confirm() {
    this.props.onConfirm(this.state.selectedFriends, this.state.selectedGroups);
  }

  _addFriend(friend) {
    if (this._existsFriend(friend) === -1)
      this.setState({ selectedFriends: this.state.selectedFriends.concat([friend]) })
  }

  _addGroup(group) {
    if (this._existsGroup(group) === -1)
      this.setState({ selectedGroups: this.state.selectedGroups.concat([group]) })
  }

  _removeFriend(friend) {
    let pos = this._existsFriend(friend);

    if (pos > -1) {
      let newList = this.state.selectedFriends.slice();
      newList.splice(pos, 1);
      this.setState({ selectedFriends: newList });
    }
  }

  _removeGroup(group) {
    let pos = this._existsGroup(group);

    if (pos > -1) {
      let newList = this.state.selectedGroups.slice();
      newList.splice(pos, 1);
      this.setState({ selectedGroups: newList });
    }
  }

  _existsFriend(friend) {
    for (let i = 0; i < this.state.selectedFriends.length; i++) {
      if (this.state.selectedFriends[i].friendId === friend.friendId)
        return i;
    }

    return -1;
  }

  _existsGroup(group) {
    return this.state.selectedGroups.findIndex((g) => {
      return g.groupId === group.groupId;
    });
    // for (let i = 0; i < this.state.selectedGroups.length; i++) {
    //   if (this.state.selectedGroups[i].groupId === group.groupId)
    //     return i;
    // }

    // return -1;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  }
});