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
import FriendshipRequestRow from './FriendshipRequestRow';
import MatchInvitationRow from './MatchInvitationRow';

export default class HomeNotifications extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      friendshipRequests: [],
      matchInvitations: [],
      isLoadingFriendshipRequest: false,
      isLoadingMatchInvitations: false,
      errorLoadingFriendshipRequest: null,
      errorLoadingMatchInvitations: null,
      isMarkingAsRead: false,
      errorMarkinAsRead: null,
      notifications: ds.cloneWithRows([])
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._renderErrorMessage = this._renderErrorMessage.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._update = this._update.bind(this);
    this._setAllNotifications = this._setAllNotifications.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onStoreChange);
    HomeActions.loadFriendshipRequest();
    HomeActions.loadMatchInvitations();
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
          dataSource={this.state.notifications}
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
      refreshFriendshipRequestList: HomeStore.shouldRefreshFriendshipRequestList(),
    }, () => {
      if (!this.state.isLoadingFriendshipRequest && !this.state.errorLoadingFriendshipRequest) {
        let friendshipRequests = HomeStore.getFriendshipRequests();
        if (friendshipRequests)
          this.setState({ friendshipRequests: friendshipRequests }, () => { this._setAllNotifications() });
      }

      if (!this.state.isLoadingMatchInvitations && !this.state.errorLoadingMatchInvitations) {
        let matchInvitations = HomeStore.getMatchInvitations();
        if (matchInvitations)
          this.setState({ matchInvitations: matchInvitations }, () => { this._setAllNotifications() });
      }

      if (this.state.refreshFriendshipRequestList) {
        HomeActions.loadFriendshipRequest();
      }
    });
  }

  _setAllNotifications() {
    let ret = [];
    if (this.state.friendshipRequests) {
      ret = ret.concat(this.state.friendshipRequests.map((elem) => {
        return {
          type: 'FRIENDSHIP_REQUEST',
          ...elem
        };
      }));
    }

    if (this.state.matchInvitations) {
      ret = ret.concat(this.state.matchInvitations.map((elem) => {
        return {
          type: 'MATCH_INVITATION',
          ...elem
        };
      }));
    }

    this.setState({ notifications: this.state.notifications.cloneWithRows(ret) });
  }

  _renderRow(rowData) {
    switch (rowData.type) {
      case 'FRIENDSHIP_REQUEST':
        return <FriendshipRequestRow data={rowData} onPress={this._rowFriendshipRequestPreseed} />

      case 'MATCH_INVITATION':
        return <MatchInvitationRow data={rowData} onPress={this._rowMatchInvitationPreseed} />

      default:
        return null;
    }
  }

  _rowFriendshipRequestPreseed(friendshipRequest) {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_FRIENDSHIP_REQUEST,
      data: friendshipRequest
    });
  }

  _rowMatchInvitationPreseed(matchInvitation) {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_MATCH_INVITATION,
      data: matchInvitation
    });
  }

  _update() {
    HomeActions.loadFriendshipRequest();
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
  }
});