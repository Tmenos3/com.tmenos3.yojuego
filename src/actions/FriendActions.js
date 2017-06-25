import FriendConstants from '../constants/FriendConstants';
import HomeActions from '../actions/HomeActions';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';

export default class FriendActions {
  static newFriendConfirmed() {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.NEW_FRIEND_CONFIRMED
    });
  }

  static confirmNewFriend(email) {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.SAVING_NEW_FRIEND
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.saveNewFriend(email, token);
      })
      .then((resp) => {
        return LocalService.saveNewFriend(resp.resp);
      })
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: FriendConstants.NEW_FRIEND_SAVED
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: FriendConstants.SAVING_NEW_FRIEND_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: FriendConstants.SAVING_NEW_FRIEND_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static friendsUpdated() {
    HomeActions.loadFriends();
  }

  static resetFriendDetail() {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.RESET
    });
  }

  static deleteFriend() {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.DELETE_FRIEND
    });
  }

  static cancelDeleteFriend() {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.CANCEL_DELETE_FRIEND
    });
  }

  static deleteConfirmed(friendId) {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.DELETING_FRIEND
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.deleteFriend(friendId, token);
      })
      .then((resp) => {
        return LocalService.deleteFriend(friendId);
      })
      .then((friends) => {
        Dispatcher.handleViewAction({
          actionType: FriendConstants.FRIEND_DELETED
        });

        HomeActions.loadFriends(friends);
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: FriendConstants.ERROR_DELETING_FRIEND,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
}