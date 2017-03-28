import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class FriendRow extends Component {
  constructor(props) {
    super(props);

    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
  }

  render() {
    return (
      <View key={this.props.friend._id} style={[styles.container, { backgroundColor: this.props.backgroundColor || 'transparent' }]}>
        <View style={styles.dataRowLeft}>
          {this._renderPhoto(this.props.friend.photo)}
        </View>
        <View style={styles.dataRowRight}>
          {this._renderInfo(this.props.friend)}
        </View>
      </View>
    );
  }

  _renderPhoto(photo) {
    if (photo)
      return (
        <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
      );

    return (
      <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
    );
  }

  _renderInfo(info) {
    let ret = [];
    if (info.firstName && info.lastName) {
      ret.push(<Text key={1} style={styles.nameText}>{info.firstName + ' ' + info.lastName}</Text>);
      ret.push(<Text key={2} style={styles.text}>{!info.email ? '' : info.email}</Text>);
      ret.push(<Text key={3} style={styles.text}>{!info.phone ? '' : info.phone}</Text>);
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
    marginTop: 15,
    marginHorizontal: 10,
    height: 100,
    flexDirection: 'row'
  },
  dataRowLeft: {
    width: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5
  },
  dataRowRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  friendPhoto: {
    width: 90,
    height: 90
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18
  }
});