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

export default class FriendListBody extends Component {
  constructor(props) {
    super(props);

    let friends = this.props.friends.map((friend) => {
      return {
        ...friend,
        selected: false
      }
    });

    this.state = {
      datasource: ds.cloneWithRows(friends),
      friends
    };

    this._renderRowFriend = this._renderRowFriend.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._setValue = this._setValue.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.datasource}
          renderRow={this._renderRowFriend}
          style={styles.listView}
          enableEmptySections={true}
        />
      </View>
    );
  }

  _setValue(id, value) {
    let newList = this.state.friends.slice();
    let pos = -1;

    for (let i = 0; i < this.state.friends.length; i++) {
      if (id === this.state.friends[i]._id) {
        pos = i;
        break;
      }
    }

    newList[pos].selected = value;
    this.setState({ friends: newList, datasource: ds.cloneWithRows(newList) }, () => {
      if (value)
        this.props.onSelect(newList[pos]);
      else
        this.props.onUnselect(newList[pos]);
    });
  }

  _renderRowFriend(rowData) {
    return (
      <View key={rowData._id} style={{ borderRadius: 10 }}>
        <View style={styles.dataRowLeft}>
          {this._renderPhoto(rowData.info.photo)}
        </View>
        <View style={styles.dataRowRight}>
          {this._renderInfo(rowData.info)}
        </View>
        <Switch
          onValueChange={(value) => this._setValue(rowData._id, value)}
          style={{ marginBottom: 10 }}
          value={rowData.selected} />
      </View>
    );
  }

  _renderPhoto(photo) {
    if (photo)
      return (
        <Image style={styles.friendPhoto} source={require('../../../statics/no_photo_friend.png')}></Image>
      );

    return (
      <Image style={styles.friendPhoto} source={require('../../../statics/no_photo_friend.png')}></Image>
    );
  }

  _renderInfo(info) {
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