import EditGroupConstants from '../constants/EditGroupConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import HomeActions from '../actions/HomeActions';

export default class EditGroupActions {
  static confirm() {
    Dispatcher.handleViewAction({
      actionType: EditGroupConstants.CONFIRM
    });
  }

  static back() {
    Dispatcher.handleViewAction({
      actionType: EditGroupConstants.BACK
    });
  }

  static editGroup(id, description, photo) {
    Dispatcher.handleViewAction({
      actionType: EditGroupConstants.SAVING_GROUP
    });

    let groupSaved = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.editGroup(id, description, photo, token)
      })
      .then((resp) => {
        groupSaved = resp.resp;
        return LocalService.updateGroup(resp.resp);
      })
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: EditGroupConstants.GROUP_SAVED,
          payload: {
            group: groupSaved
          }
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: EditGroupConstants.ERROR_SAVING_GROUP,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: EditGroupConstants.ERROR_SAVING_GROUP,
          payload: error.message
        });
      });;
  }

  static groupsUpdated() {
    HomeActions.loadGroups();
  }
}