import GroupConstants from '../constants/GroupConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import HomeActions from '../actions/HomeActions';

export default class GroupActions {
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
}