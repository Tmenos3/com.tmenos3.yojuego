import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import HomeActions from '../../actions/HomeActions';
import NavigationActions from '../../actions/NavigationActions';
import HomeStore from '../../stores/HomeStore';
import RouteConstants from '../../constants/RouteConstants';

export default class FriendsAndGroups extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      friends: ds.cloneWithRows([]),
      groups: ds.cloneWithRows([]),
      showFriendOrGroup: 'F',
      isLoadingPlayerFriends: false,
      errorLoadingPlayerFriends: null,
      isLoadingPlayerGroups: false,
      errorLoadingPlayerGroups: null,
    };

    this._rowFriendPreseed = this._rowFriendPreseed.bind(this);
    this._rowGroupPreseed = this._rowGroupPreseed.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._showFriends = this._showFriends.bind(this);
    this._showGroups = this._showGroups.bind(this);
    this._renderRowFriend = this._renderRowFriend.bind(this);
    this._renderRowGroup = this._renderRowGroup.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._newFriend = this._newFriend.bind(this);
    this._newGroup = this._newGroup.bind(this);
    this._updateFriends = this._updateFriends.bind(this);
    this._updateGroups = this._updateGroups.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onStoreChange);
    HomeActions.loadFriends();
    HomeActions.loadGroups();
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    let showContainer = { flex: 1 }
    let hideContainer = { width: 0, height: 0 }

    return (
      <View style={styles.slide}>
        <Text style={{ fontSize: 20 }}>Amigos y grupos</Text>
        <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, height: 50 }}>
          <TouchableOpacity style={styles.button} onPress={this._showFriends}>
            <Text style={styles.buttonText}>Amigos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._showGroups}>
            <Text style={styles.buttonText}>Grupos</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', width: Dimensions.get('window').width, flex: 1 }}>
          <View style={[{ backgroundColor: 'blue', width: Dimensions.get('window').width }, this.state.showFriendOrGroup == 'F' ? showContainer : hideContainer]}>
            {this._renderLoading(this.state.isLoadingPlayerFriends)}
            {this._renderErrorMessage(this.state.errorLoadingPlayerFriends)}
            <ListView
              dataSource={this.state.friends}
              renderRow={this._renderRowFriend}
              style={styles.listView}
              enableEmptySections={true}
              />
            <TouchableOpacity style={styles.buttonFloat} onPress={this._newFriend}>
              <Text style={styles.buttonText}>+F</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonFloat, { left: 30, right: 0 }]} onPress={this._updateFriends}>
              <Text style={styles.buttonText}>Up</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ backgroundColor: 'red', width: Dimensions.get('window').width }, this.state.showFriendOrGroup == 'G' ? showContainer : hideContainer]}>
            {this._renderLoading(this.state.isLoadingPlayerGroups)}
            {this._renderErrorMessage(this.state.errorLoadingPlayerGroups)}
            <ListView
              dataSource={this.state.groups}
              renderRow={this._renderRowGroup}
              style={styles.listView}
              enableEmptySections={true}
              />
            <TouchableOpacity style={styles.buttonFloat} onPress={this._newGroup}>
              <Text style={styles.buttonText}>+G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonFloat, { left: 30, right: 0 }]} onPress={this._updateGroups}>
              <Text style={styles.buttonText}>Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _renderRowFriend(rowData) {
    return (
      <View key={rowData._id} style={{ borderRadius: 10 }}>
        <TouchableOpacity style={styles.dataRow} onPress={() => this._rowFriendPreseed(rowData._id)}>
          <View style={styles.dataRowLeft}>
            {this._renderPhoto(rowData.info.photo)}
          </View>
          <View style={styles.dataRowRight}>
            {this._renderInfo(rowData.info)}
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
      <View>
        {ret}
      </View>
    );
  }

  _renderRowGroup(rowData) {
    return (
      <View key={rowData._id} style={{ borderRadius: 10 }}>
        <TouchableOpacity style={styles.dataRow} onPress={() => this._rowGroupPreseed(rowData._id)}>
          <View style={styles.dataRowLeft}>
            <Text style={{ fontSize: 26 }}>{rowData.photo}</Text>
          </View>
          <View style={styles.dataRowRight}>
            <Text style={{ fontSize: 20 }}>{rowData.description}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _rowFriendPreseed(friendId) {
    HomeActions.showFriend(friendId);
  }

  _rowGroupPreseed(groupId) {
    HomeActions.showGroup(groupId);
  }

  _onStoreChange() {
    this.setState({
      isLoadingFriends: HomeStore.isLoadingFriends(),
      errorLoadingFriends: HomeStore.getErrorLoadingFriends(),
      isLoadingGroups: HomeStore.isLoadingGroups(),
      errorLoadingGroups: HomeStore.getErrorLoadingGroups(),
    }, () => {
      if (!this.state.isLoadingFriends && !this.state.errorLoadingFriends) {
        let friends = HomeStore.getFriends();
        if (friends)
          this.setState({ friends: this.state.friends.cloneWithRows(friends) });
      }

      if (!this.state.isLoadingGroups && !this.state.errorLoadingGroups) {
        let groups = HomeStore.getGroups();
        if (groups)
          this.setState({ groups: this.state.groups.cloneWithRows(groups) });
      }
    });
  }

  _showFriends() {
    this.setState({ showFriendOrGroup: 'F' });
  }

  _showGroups() {
    this.setState({ showFriendOrGroup: 'G' });
  }

  _newFriend() {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_NEW_FRIEND,
    });
  }

  _newGroup() {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_NEW_GROUP,
      data: HomeStore.getFriends()
    });
  }

  _updateFriends() {
    HomeActions.updateFriends();
  }

  _updateGroups() {
    HomeActions.updateGroups();
  }

  _renderLoading(loading) {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderErrorMessage(message) {
    if (message) {
      return (
        <Text style={{ color: 'red', fontSize: 30 }}>message</Text>
      )
    }

    return null;
  }

  _renderDot() {
    return (
      <View style={{
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  button: {
    backgroundColor: 'gray',
    width: 60,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonText: {
    color: 'black',
    fontSize: 45,
    backgroundColor: 'transparent',
    flex: 1
  },
  buttonFloat: {
    backgroundColor: 'gray',
    width: 60,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 100
  },
  dataRow: {
    marginTop: 6,
    marginHorizontal: 6,
    borderBottomWidth: 0.5,
    height: 60,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    borderRadius: 5
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
  listView: {
    flex: 1,
    borderColor: 'grey'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  friendPhoto: {
    width: 60,
    height: 60
  }
});