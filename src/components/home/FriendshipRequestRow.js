import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

export default class FriendshipRequestRow extends Component {
  render() {
    return (
      <View key={this.props.data._id} style={{ borderRadius: 10 }}>
        <TouchableOpacity style={[styles.dataRow, { backgroundColor: 'rgba(255, 0, 0, 0.25)' }]} onPress={this._onPress.bind(this)}>
          <View style={styles.dataRowLeft}>
            {this._renderPhoto(this.props.data.sender.photo)}
          </View>
          <View style={styles.dataRowRight}>
            {this._renderInfo(this.props.data.sender)}
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{'Solicitud de amistad'}</Text>
          </View>
        </TouchableOpacity>
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
      ret.push(<Text key={1} style={{ fontSize: 20 }}>{info.firstName + ' ' + info.lastName}</Text>);
      ret.push(<Text key={2} style={{ fontSize: 16, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
      ret.push(<Text key={3} style={{ fontSize: 16, textAlign: 'left' }}>{!info.phone ? '' : info.phone}</Text>);
    }
    else {
      ret.push(<Text key={1} style={{ fontSize: 20, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
    }

    return (
      <View>{ret}</View>
    );
  }

  _onPress() {
    this.props.onPress(this.props.data)
  }
}

const styles = StyleSheet.create({
  friendPhoto: {
    width: 70,
    height: 70
  },
  dataRow: {
    marginTop: 6,
    marginHorizontal: 6,
    borderBottomWidth: 0.5,
    height: 100,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.94
  },
  dataRowLeft: {
    width: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataRowRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
  }
});