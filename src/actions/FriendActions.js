import FriendConstants from '../constants/FriendConstants';
import HomeActions from '../actions/HomeActions';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';

export default class FriendActions {
  static loadFriend(friendId) {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.LOADING_FRIEND
    });
  }

  static deleteFriend(friendId) {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.DELETING_FRIEND
    });
  }

  static newFriendConfirmed() {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.NEW_FRIEND_CONFIRMED
    });
  }

  static confirmNewFriend(email) {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.SAVING_NEW_FRIEND
    });

    ApiService.saveNewFriend(email, LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendConstants.NEW_FRIEND_SAVED
        });

        LocalService.saveNewFriend(resp.resp);
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
}