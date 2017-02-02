import HomeConstants from '../constants/HomeConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import LoginConstants from '../constants/LoginConstants';

export default class HomeActions {
  static showMenu() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.SHOW_HOME_MENU
    });
  }

  static hideMenu() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.HIDE_HOME_MENU
    });
  }

  static createMatch() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.CREATE_MATCH
    });
  }

  static showMatchDetail(match) {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.SHOW_MATCH_DETAIL,
      payload: match
    });
  }

  static loadPlayerMatches() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_MATCHES
    });

    ApiService.getUpcomingPlayerMatches(LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.MATCHES_LOADED,
          payload: resp.resp
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_MATCHES,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_MATCHES,
          payload: error.message
        });
      });
  }

  static loadPlayerFriends() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_PLAYER_FRIENDS
    });

    LocalService.getPlayerFriends()
      .then((response) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.PLAYER_FRIENDS_LOADED,
          payload: response.resp
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_PLAYER_FRIENDS,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_PLAYER_FRIENDS,
          payload: error.message
        });
      });
  }

  static loadPlayerGroups() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_PLAYER_GROUPS
    });

    LocalService.getPlayerGroups()
      .then((response) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.PLAYER_GROUPS_LOADED,
          payload: response.resp
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_PLAYER_GROUPS,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_PLAYER_GROUPS,
          payload: error.message
        });
      });
  }

  static showFriend(friendId){
    Dispatcher.handleViewAction({
      actionType: HomeConstants.SHOW_FRIEND,
      payload: friendId
    });
  }

  static showGroupd(groupId){
    Dispatcher.handleViewAction({
      actionType: HomeConstants.SHOW_GROUP,
      payload: groupId
    });
  }
};