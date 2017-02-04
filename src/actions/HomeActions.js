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

  static loadFriends() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_FRIENDS
    });

    LocalService.getFriends()
      .then((response) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.FRIENDS_LOADED,
          payload: response
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_FRIENDS,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_FRIENDS,
          payload: error.message
        });
      });
  }

  static loadGroups() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_GROUPS
    });

    LocalService.getGroups()
      .then((response) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.GROUPS_LOADED,
          payload: response.resp
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_GROUPS,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_GROUPS,
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

  static showGroups(groupId){
    Dispatcher.handleViewAction({
      actionType: HomeConstants.SHOW_GROUP,
      payload: groupId
    });
  }

  static updateFriends() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_FRIENDS
    });

    ApiService.getMyFriends(LocalService.getToken())
      .then((resp) => {
        LocalService.saveFriends(resp.resp);

        Dispatcher.handleViewAction({
          actionType: HomeConstants.FRIENDS_LOADED,
          payload: resp.resp
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOADING_FRIENDS_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOADING_FRIENDS_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static updateGroups() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_GROUPS
    });

    ApiService.getMyGroups(LocalService.getToken())
      .then((resp) => {
        LocalService.saveGroups(resp.resp);

        Dispatcher.handleViewAction({
          actionType: HomeConstants.GROUPS_LOADED,
          payload: resp.resp
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOADING_GROUPS_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOADING_GROUPS_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
};