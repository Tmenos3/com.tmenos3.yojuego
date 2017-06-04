import NewGroupConstants from '../constants/NewGroupConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import HomeActions from '../actions/HomeActions';

export default class CreateMatchActions {
  static confirm() {
    Dispatcher.handleViewAction({
      actionType: NewGroupConstants.CONFIRM
    });
  }

  static back() {
    Dispatcher.handleViewAction({
      actionType: NewGroupConstants.BACK
    });
  }

  static createGroup(description, friends, photo) {
    Dispatcher.handleViewAction({
      actionType: NewGroupConstants.SAVING_GROUP
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.saveNewGroup(description, friends.map(friend => { return friend.friendId }), photo, token)
      })
      .then((resp) => {
        return LocalService.saveNewGroup(resp.resp);
      })
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: NewGroupConstants.GROUP_SAVED
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: NewGroupConstants.ERROR_SAVING_GROUP,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: NewGroupConstants.ERROR_SAVING_GROUP,
          payload: error.message
        });
      });;
  }

  static loadFriends() {
    Dispatcher.handleViewAction({
      actionType: NewGroupConstants.LOADING_FRIENDS
    });

    LocalService.getFriends()
      .then((friends) => {
        Dispatcher.handleViewAction({
          actionType: NewGroupConstants.FRIENDS_LOADED,
          payload: friends
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: NewGroupConstants.ERROR_LOADING_FRIENDS,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: NewGroupConstants.ERROR_LOADING_FRIENDS,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static groupsUpdated() {
    Dispatcher.handleViewAction({
      actionType: NewGroupConstants.CLEAN_NEW_GROUP
    });

    HomeActions.loadGroups();
  }
}