import GroupConstants from '../constants/GroupConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import HomeActions from '../actions/HomeActions';
import NavigationActions from '../actions/NavigationActions';
import RouteConstants from '../constants/RouteConstants';

export default class GroupActions {
  static back() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.BACK
    });
  }

  static loadGroup(groupId) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.LOADING_GROUP
    });

    LocalService.getGroups()
      .then((groups) => {
        let group = groups.find((g) => { return g._id === groupId; });
        return Promise.resolve(group);
      })
      .then((group) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.GROUP_LOADED,
          payload: {
            group
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.ERROR_LOADING_GROUP,
          payload: {
            message: error.message
          }
        });
      });
  }

  static edit(group) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.EDIT_GROUP,
      payload: {
        group
      }
    });
  }

  static delete() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.DELETE_GROUP
    });
  }

  static exit() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.EXIT_GROUP
    });
  }

  static removePlayer() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.REMOVE_PLAYER
    });
  }

  static makePlayerAdmin() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.MAKE_PLAYER_ADMIN
    });
  }

  static cancelDeleteGroup() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.CANCEL_DELETE_GROUP
    });
  }

  static cancelExitGroup() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.CANCEL_EXIT_GROUP
    });
  }

  static cancelRemovePlayer() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.CANCEL_REMOVE_PLAYER
    });
  }

  static cancelMakeAdminPlayer() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.CANCEL_MAKE_PLAYER_ADMIN
    });
  }

  static deleteConfirmed(groupId) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.DELETING_GROUP
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.deleteGroup(groupId, token);
      })
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.GROUP_DELETED
        });

        HomeActions.loadGroups();
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.ERROR_DELETING_GROUP,
          payload: {
            message: error.message
          }
        });
      });
  }

  static exitConfirmed(groupId) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.EXITING_GROUP
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.exitGroup(groupId, token);
      })
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.GROUP_EXITED
        });

        HomeActions.loadGroups();
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.ERROR_EXITING_GROUP,
          payload: {
            message: error.message
          }
        });
      });
  }

  static removePlayerConfirmed(groupId, playerId) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.REMOVING_PLAYER
    });

    let group = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.removePlayer(groupId, playerId, token);
      })
      .then((resp) => {
        group = resp.resp;
        return LocalService.updateGroup(group);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.PLAYER_REMOVED,
          payload: {
            group
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.ERROR_REMOVING_PLAYER,
          payload: {
            message: error.message
          }
        });
      });
  }

  static makeAdminPlayerConfirmed(groupId, playerId) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.MAKING_PLAYER_ADMIN
    });

    let group = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.makeAdminPlayer(groupId, playerId, token);
      })
      .then((resp) => {
        group = resp.resp;
        return LocalService.updateGroup(group);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.PLAYER_MADE_ADMIN,
          payload: {
            group
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.ERROR_MAKING_PLAYER_ADMIN,
          payload: {
            message: error.message
          }
        });
      });
  }

  static editShown() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.EDIT_SHOWN
    });
  }

  static resetGroupDetail() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.RESET
    });
  }

  static selectFriendsToAdd(onBack, onConfirm) {
    LocalService.getFriends()
      .then((friends) => {
        NavigationActions.addRoute({
          id: RouteConstants.ROUTE_FRIEND_LIST,
          data: {
            friends,
            onBack,
            onConfirm
          }
        });
      });
  }

  static addPlayers(groupId, players) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.ADDING_PLAYERS
    });

    let group = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.addPlayers(groupId, players.map((p) => { return p.friendId }), token);
      })
      .then((resp) => {
        group = resp.resp;
        return LocalService.updateGroup(group);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.PLAYERS_ADDED,
          payload: {
            group
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.ERROR_ADDING_PLAYERS,
          payload: {
            message: error.message
          }
        });
      });
  }

  static resetAddPlayers() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.RESET_ADD_PLAYERS
    });
  }

  static resetRemovePlayer() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.RESET_REMOVE_PLAYER
    });
  }

  static resetMakePlayerAdmin() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.RESET_MAKE_PLAYER_ADMIN
    });
  }
}