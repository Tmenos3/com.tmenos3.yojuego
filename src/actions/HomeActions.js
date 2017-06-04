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

    LocalService.getToken()
      .then((token) => {
        ApiService.getUpcomingPlayerMatches(token)
          .then((resp) => {
            LocalService.savePlayerMatches(resp.resp);
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
      });
  }

  static loadFriendshipRequest() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_FRIENDSHIP_REQUEST
    });

    LocalService.getToken()
      .then((token) => {
        ApiService.getFriendshipRequest(token)
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
      });
  }

  static loadMatchInvitations() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_MATCH_INVITATIONS
    });

    LocalService.getToken()
      .then((token) => {
        ApiService.getMatchInvitations(token)
          .then((resp) => {
            LocalService.saveMatchInvitations(resp.resp);

            Dispatcher.handleViewAction({
              actionType: HomeConstants.MATCH_INVITATIONS_LOADED,
              payload: resp.resp
            });
          }, (cause) => {
            Dispatcher.handleViewAction({
              actionType: HomeConstants.LOADING_MATCH_INVITATIONS_FAILED,
              payload: cause.message
            });
          })
          .catch((error) => {
            Dispatcher.handleViewAction({
              actionType: HomeConstants.LOADING_MATCH_INVITATIONST_FAILED,
              payload: error.message
            });
          });
      });
  }

  static loadFriends() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_FRIENDS
    });

    LocalService.getToken()
      .then((token) => {
        ApiService.getMyFriends(token)
          .then((response) => {
            LocalService.saveFriends(response.resp)
              .then(() => {
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
      });
  }

  static loadGroups() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_GROUPS
    });

    LocalService.getToken()
      .then((token) => {
        ApiService.getMyGroups(token)
          .then((response) => {
            LocalService.saveGroups(response.resp)
              .then(() => {
                Dispatcher.handleViewAction({
                  actionType: HomeConstants.GROUPS_LOADED,
                  payload: response.resp
                });
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
      payload: {
        groupId
      }
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

    LocalService.getToken()
      .then((token) => {
        return ApiService.getMyGroups(token)
      })
      .then((resp) => {
        return LocalService.saveGroups(resp.resp);
      })
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
  }

  static logOut() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOGOUT_INTENT
    });

    LocalService.getToken()
      .then((token) => {
        ApiService.logOut(token)
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
      });
  }

  static loadPlayer() {
    Dispatcher.handleViewAction({
      actionType: HomeConstants.LOADING_PLAYER
    });

    LocalService.getPlayer()
      .then((player) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.PLAYER_LOADED,
          payload: player
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_PLAYER,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.ERROR_LOADING_PLAYER,
          payload: error.message
        });
      });
  }

  static showAccount() {
    LocalService.getPlayer()
      .then((player) => {
        Dispatcher.handleViewAction({
          actionType: HomeConstants.SHOW_ACCOUNT,
          payload: player
        });
      });
  }

  static showSettings() {

  }

  static showNotificationSettings() {

  }

  static showHelp() {

  }

  static showAboutUs() {

  }
};