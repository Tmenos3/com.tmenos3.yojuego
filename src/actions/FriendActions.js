import FriendConstants from '../constants/FriendConstants';
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

  static confirmNewFriend(email, phone) {
    Dispatcher.handleViewAction({
      actionType: FriendConstants.SAVING_NEW_FRIEND
    });

    ApiService.saveNewFriend(email, phone, LocalService.getToken())
      .then((resp) => {
        LocalService.saveNewFriend(resp.resp);

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
}