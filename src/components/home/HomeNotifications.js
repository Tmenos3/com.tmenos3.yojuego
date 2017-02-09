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

export default class HomeNotifications extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      friendshipRequests: ds.cloneWithRows([]),
      isLoadingFriendshipRequest: false,
      errorLoadingFriendshipRequest: null,
    };

    // this._rowFriendPreseed = this._rowFriendPreseed.bind(this);
    // this._rowGroupPreseed = this._rowGroupPreseed.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    // this._showFriends = this._showFriends.bind(this);
    // this._showGroups = this._showGroups.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._renderErrorMessage = this._renderErrorMessage.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    // this._newFriend = this._newFriend.bind(this);
    // this._newGroup = this._newGroup.bind(this);
    this._update = this._update.bind(this);
    // this._updateGroups = this._updateGroups.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onStoreChange);
    HomeActions.loadFriendshipRequest();
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoading(this.state.isLoadingFriendshipRequest)}
        <Text style={styles.text}>Notificaciones</Text>
        <ListView
          dataSource={this.state.friendshipRequests}
          renderRow={this._renderRow}
          style={styles.listView}
          enableEmptySections={true}
        />
        <TouchableOpacity style={[styles.buttonFloat, { left: 30, right: 0 }]} onPress={this._update}>
          <Text style={styles.buttonText}>Up</Text>
        </TouchableOpacity>
        {this._renderErrorMessage(this.state.errorLoadingFriendshipRequest)}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isLoadingFriendshipRequest: HomeStore.isLoadingFriendshipRequest(),
      errorLoadingFriendshipRequest: HomeStore.getErrorLoadingFriendshipRequest(),
    }, () => {
      if (!this.state.isLoadingFriendshipRequest && !this.state.errorLoadingFriendshipRequest) {
        let friendshipRequests = HomeStore.getFriendshipRequests();
        if (friendshipRequests)
          this.setState({ friendshipRequests: this.state.friendshipRequests.cloneWithRows(friendshipRequests) });
      }
    });
  }

  _renderRow(rowData) {
    return (
      <View key={rowData._id} style={{ borderRadius: 10 }}>
        <TouchableOpacity style={styles.dataRow} onPress={() => this._rowPreseed(rowData)}>
          <View style={styles.dataRowLeft}>
            {this._renderPhoto(rowData.sender.photo)}
          </View>
          <View style={styles.dataRowRight}>
            {this._renderInfo(rowData.sender)}
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{'Solicitud de amistad'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _rowPreseed(friendshipRequest) {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_FRIENDSHIP_REQUEST,
      data: friendshipRequest
    });
  }

  _update() {
    HomeActions.loadFriendshipRequest();
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

  // _renderRowGroup(rowData) {
  //   return (
  //     <View key={rowData._id} style={{ borderRadius: 10 }}>
  //       <TouchableOpacity style={styles.dataRow} onPress={() => this._rowGroupPreseed(rowData._id)}>
  //         <View style={styles.dataRowLeft}>
  //           <Text style={{ fontSize: 26 }}>{rowData.photo}</Text>
  //         </View>
  //         <View style={styles.dataRowRight}>
  //           <Text style={{ fontSize: 20 }}>{rowData.description}</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  // _rowGroupPreseed(groupId) {
  //   HomeActions.showGroup(groupId);
  // }

  // _showFriends() {
  //   this.setState({ showFriendOrGroup: 'F' });
  // }

  // _showGroups() {
  //   this.setState({ showFriendOrGroup: 'G' });
  // }

  // _newFriend() {
  //   NavigationActions.addRoute({
  //     id: RouteConstants.ROUTE_NEW_FRIEND,
  //   });
  // }

  // _newGroup() {
  //   NavigationActions.addRoute({
  //     id: RouteConstants.ROUTE_NEW_GROUP,
  //     data: HomeStore.getFriends()
  //   });
  // }

  // _updateGroups() {
  //   HomeActions.updateGroups();
  // }

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  listView: {
    flex: 1,
    borderColor: 'grey'
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
  buttonText: {
    color: 'black',
    fontSize: 45,
    backgroundColor: 'transparent',
    flex: 1
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
  },
  friendPhoto: {
    width: 70,
    height: 70
  }
});