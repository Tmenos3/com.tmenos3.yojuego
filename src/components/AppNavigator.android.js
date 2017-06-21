import React, { Component } from 'react';
import { Navigator, BackAndroid } from 'react-native';
import CompleteProfileInfo from './auth/CompleteProfileInfo';
import CreateMatch from './matchCreation/CreateMatch';
import FacebookLogIn from './auth/FacebookLogIn';
import FieldSearch from './matchCreation/fieldSearch/FieldSearch';
import GoogleLogIn from './auth/GoogleLogin';
import Home from './home/Home';
import InputMail from './InputMail';
import InvitePlayers from './invitePlayers/InvitePlayers';
import LogIn from './LogIn';
import MatchDetail from './match/MatchDetail';
import NavigationConstants from '../constants/NavigationConstants';
import NavigationStore from '../stores/NavigationStore';
import PlayerTour from './playerTour/PlayerTour';
import RouteConstants from '../constants/RouteConstants';
import SignUp from './auth/SignUp';
import Splash from './Splash';
import NewFriend from './friend/NewFriend';
import NewGroup from './group/NewGroup';
import FriendshipRequest from './friendshipRequest/FriendshipRequest';
import MatchInvitation from './matchInvitation/MatchInvitation';
import FriendList from './common/friendList/FriendList';
import Account from './account/Account';
import GroupDetail from './group/GroupDetail';
import FriendDetail from './friend/FriendDetail';
import EditGroup from './group/EditGroup';
import EditMatch from './match/EditMatch';
import FriendAndGroupList from './common/friendAndGroupList/FriendAndGroupList';

let _navigator;

export default class AppNavigator extends Component {
  componentDidMount() {
    NavigationStore.addChangeListener(this._onNavigationStoreChange);
    BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount() {
    NavigationStore.removeChangeListener(this._onNavigationStoreChange);
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  }

  _handleBack() {
    if (_navigator && _navigator.getCurrentRoutes().length > 1)
      _navigator.pop();

    return true;
  }

  _onNavigationStoreChange() {
    switch (NavigationStore.getCurrentAction()) {
      case NavigationConstants.ADD_ROUTE:
        _navigator.push({
          id: NavigationStore.getCurrentRoute().id,
          data: NavigationStore.getCurrentRoute().data
        });
        break;
      case NavigationConstants.REPLACE_ROUTE:
        _navigator.replace({
          id: NavigationStore.getCurrentRoute().id,
          data: NavigationStore.getCurrentRoute().data
        });
        break;
      case NavigationConstants.RESET_TO_ROUTE:
        _navigator.resetTo({
          id: NavigationStore.getCurrentRoute().id,
          data: NavigationStore.getCurrentRoute().data
        });
        break;
      case NavigationConstants.BACK:
        _navigator.pop();
        break;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref={this._setNavigator}
        renderScene={this._renderComponent}
        style={{ flex: 1 }}
      />
    );
  }

  _setNavigator(navigatorInstance) {
    if (_navigator == undefined || _navigator == null) {
      _navigator = navigatorInstance;
    }
  }

  _renderComponent(route) {
    switch (route.id) {
      case RouteConstants.ROUTE_SPLASH:
        return (
          <Splash />
        );
      case RouteConstants.ROUTE_LOGIN:
        return (
          <LogIn />
        );
      case RouteConstants.ROUTE_FACEBOOK_LOGIN:
        return (
          <FacebookLogIn />
        );
      case RouteConstants.ROUTE_GOOGLE_LOGIN:
        return (
          <GoogleLogIn />
        );
      case RouteConstants.ROUTE_SIGNUP:
        return (
          <SignUp />
        );
      case RouteConstants.ROUTE_CREATE_PROFILE:
        return (
          <CompleteProfileInfo />
        );
      case RouteConstants.ROUTE_PLAYER_TOUR:
        return (
          <PlayerTour />
        );
      case RouteConstants.ROUTE_FORGET_PASSWORD:
        return (
          <InputMail />
        );
      case RouteConstants.ROUTE_HOME:
        return (
          <Home player={route.data.player} />
        );
      case RouteConstants.ROUTE_MATCH_DETAIL:
        return (
          <MatchDetail match={route.data} />
        );
      case RouteConstants.ROUTE_CREATE_MATCH:
        return (
          <CreateMatch />
        );
      case RouteConstants.ROUTE_INVITE_PLAYERS:
        return (
          <InvitePlayers />
        );
      case RouteConstants.ROUTE_FIELD_SEARCH:
        return (
          <FieldSearch title={route.data.title} date={route.data.date} />
        );
      case RouteConstants.ROUTE_NEW_FRIEND:
        return (
          <NewFriend />
        );

      case RouteConstants.ROUTE_NEW_GROUP:
        return (
          <NewGroup friends={route.data} />
        );

      case RouteConstants.ROUTE_FRIENDSHIP_REQUEST:
        return (
          <FriendshipRequest friendshipRequest={route.data} />
        );

      case RouteConstants.ROUTE_MATCH_INVITATION:
        return (
          <MatchInvitation matchInvitation={route.data} />
        );

      case RouteConstants.ROUTE_FRIEND_LIST:
        return (
          <FriendList friends={route.data.friends} onBack={route.data.onBack} onConfirm={route.data.onConfirm} />
        );

      case RouteConstants.ROUTE_ACCOUNT:
        return (
          <Account player={route.data} />
        );

      case RouteConstants.ROUTE_GROUP_DETAIL:
        return (
          <GroupDetail groupId={route.data} />
        );

      case RouteConstants.ROUTE_FRIEND_DETAIL:
        return (
          <FriendDetail friend={route.data} />
        );

      case RouteConstants.ROUTE_EDIT_GROUP:
        return (
          <EditGroup group={route.data} />
        );

      case RouteConstants.ROUTE_EDIT_MATCH:
        return (
          <EditMatch match={route.data} />
        );

      case RouteConstants.ROUTE_FRIEND_AND_GROUP_LIST:
        return (
          <FriendAndGroupList friends={route.data.friends} groups={route.data.groups} onBack={route.data.onBack} onConfirm={route.data.onConfirm} />
        );
    }
  }
}