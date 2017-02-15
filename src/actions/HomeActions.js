import HomeConstants from '../constants/HomeConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import LoginConstants from '../constants/LoginConstants';
import AppConstants from '../constants/AppConstants';
import AppActions from '../actions/AppActions';

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

  static loadFriendshipRequest() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_FRIENDSHIP_REQUEST
    });

    ApiService.getFriendshipRequest(LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.FRIENDSHIP_REQUEST_LOADED,
          payload: resp.resp
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOADING_FRIENDSHIP_REQUEST_FAILED,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOADING_FRIENDSHIP_REQUEST_FAILED,
          payload: error.message
        });
      });
  }

  static loadFriends() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_FRIENDS
    });

    ApiService.getMyFriends(LocalService.getToken())
      .then((response) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.FRIENDS_LOADED,
          payload: response.resp
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

    ApiService.getMyGroups(LocalService.getToken())
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

  static showFriend(friendId) {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.SHOW_FRIEND,
      payload: friendId
    });
  }

  static showGroup(groupId) {
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
        LocalService.saveFriends(resp.resp)
          .then((friends) => {
            Dispatcher.handleViewAction({
              actionType: HomeConstants.FRIENDS_LOADED,
              payload: friends
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
        LocalService.saveGroups(resp.resp)
          .then((groups) => {
            Dispatcher.handleViewAction({
              actionType: HomeConstants.GROUPS_LOADED,
              payload: groups
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

  static logOut() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOGOUT_INTENT
    });

    ApiService.logOut(LocalService.getToken())
      .then((resp) => {
        return LocalService.clearToken();
      })
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOGOUT_RESOLVED
        });

        AppActions.resetApp();
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOGOUT_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.LOGOUT_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
};