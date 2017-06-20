import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Switch,
  ListView
} from 'react-native';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class FriendAndGroupListBody extends Component {
  constructor(props) {
    super(props);

    let friends = this.props.friends.map((f) => {
      return {
        ...f,
        selected: false
      }
    });

    let groups = this.props.groups.map((g) => {
      return {
        ...g,
        selected: false
      }
    });

    this.state = {
      dsFriends: ds.cloneWithRows(friends),
      dsGroups: ds.cloneWithRows(groups),
      friends,
      groups
    };

    this._renderRowFriend = this._renderRowFriend.bind(this);
    this._renderRowGroup = this._renderRowGroup.bind(this);
    this._renderPhotoFriend = this._renderPhotoFriend.bind(this);
    this._renderPhotoGroup = this._renderPhotoGroup.bind(this);
    this._renderInfoFriend = this._renderInfoFriend.bind(this);
    this._renderInfoGroup = this._renderInfoGroup.bind(this);
    this._setValueFriend = this._setValueFriend.bind(this);
    this._setValueGroup = this._setValueGroup.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dsGroups}
          renderRow={this._renderRowGroup}
          style={styles.listView}
          enableEmptySections={true}
        />
        <ListView
          dataSource={this.state.dsFriends}
          renderRow={this._renderRowFriend}
          style={styles.listView}
          enableEmptySections={true}
        />
      </View>
    );
  }

  _setValueFriend(id, value) {
    let newList = this.state.friends.slice();
    // let pos = -1;
    let pos = this.state.friends.findIndex((f) => {
      return id === f._id;
    });

    // for (let i = 0; i < this.state.friends.length; i++) {
    //   if (id === this.state.friends[i]._id) {
    //     pos = i;
    //     break;
    //   }
    // }

    newList[pos].selected = value;
    this.setState({ friends: newList, dsFriends: ds.cloneWithRows(newList) }, () => {
      if (value)
        this.props.onSelectFriend(newList[pos]);
      else
        this.props.onUnselectFriend(newList[pos]);
    });
  }

  _setValueGroup(id, value) {
    let newList = this.state.groups.slice();
    let pos = this.state.groups.findIndex((g) => {
      return id === g._id;
    });

    newList[pos].selected = value;
    this.setState({ groups: newList, dsGroups: ds.cloneWithRows(newList) }, () => {
      if (value)
        this.props.onSelectGroup(newList[pos]);
      else
        this.props.onUnselectGroup(newList[pos]);
    });
  }

  _renderRowFriend(rowData) {
    return (
      <View key={rowData._id} style={{ borderRadius: 10 }}>
        <View style={styles.dataRowLeft}>
          {this._renderPhotoFriend(rowData.info.photo)}
        </View>
        <View style={styles.dataRowRight}>
          {this._renderInfoFriend(rowData.info)}
        </View>
        <Switch
          onValueChange={(value) => this._setValueFriend(rowData._id, value)}
          style={{ marginBottom: 10 }}
          value={rowData.selected} />
      </View>
    );
  }

  _renderRowGroup(rowData) {
    return (
      <View key={rowData._id} style={{ borderRadius: 10 }}>
        <View style={styles.dataRowLeft}>
          {this._renderPhotoGroup(rowData.photo)}
        </View>
        <View style={styles.dataRowRight}>
          {this._renderInfoGroup(rowData)}
        </View>
        <Switch
          onValueChange={(value) => this._setValueGroup(rowData._id, value)}
          style={{ marginBottom: 10 }}
          value={rowData.selected} />
      </View>
    );
  }

  _renderPhotoFriend(photo) {
    if (photo)
      return (
        <Image style={styles.friendPhoto} source={require('../../../statics/no_photo_friend.png')}></Image>
      );

    return (
      <Image style={styles.friendPhoto} source={require('../../../statics/no_photo_friend.png')}></Image>
    );
  }

  _renderPhotoGroup(photo) {
    if (photo)
      return (
        <Image style={styles.friendPhoto} source={require('../../../statics/no_photo_group.png')}></Image>
      );

    return (
      <Image style={styles.friendPhoto} source={require('../../../statics/no_photo_group.png')}></Image>
    );
  }

  _renderInfoFriend(info) {
    let ret = [];
    if (info.firstName && info.lastName) {
      ret.push(<Text key={1} style={{ fontSize: 20 }}>{info.firstName + ' ' + info.lastName}</Text>);
      ret.push(<Text key={2} style={{ fontSize: 16, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
      ret.push(<Text key={3} style={{ fontSize: 16, textAlign: 'left' }}>{!info.phone ? '' : info.phone}</Text>);
    }
    else {
      ret.push(<Text key={1} style={{ fontSize: 20, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
    }

    return (
      <View>
        {ret}
      </View>
    );
  }

  _renderInfoGroup(info) {
    return (
      <View>
        <Text key={1} style={{ fontSize: 20 }}>{info.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  listView: {
    flex: 1,
    borderColor: 'grey'
  },
  dataRowLeft: {
    width: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataRowRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  friendPhoto: {
    width: 60,
    height: 60
  }
});