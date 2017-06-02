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
  }

  static deleteGroup(groupId) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.DELETING_GROUP
    });
  }

  static newGroupConfirmed() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.NEW_GROUP_CONFIRMED
    });
  }

  static confirmNewGroup(description, friends, photo) {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.SAVING_NEW_GROUP
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.saveNewGroup(description, friends, photo, token)
      })
      .then((resp) => {
        return LocalService.saveNewGroup(resp.resp);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.NEW_GROUP_SAVED,
          payload: {
            groups: resp
          }
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.SAVING_NEW_GROUP_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: GroupConstants.SAVING_NEW_GROUP_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static groupsUpdated() {
    HomeActions.loadGroups();
  }
}