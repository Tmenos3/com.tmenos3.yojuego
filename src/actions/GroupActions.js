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

  static editShown() {
    Dispatcher.handleViewAction({
      actionType: GroupConstants.EDIT_SHOWN
    });
  }
}