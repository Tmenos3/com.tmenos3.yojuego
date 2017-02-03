import FriendConstants from '../constants/FriendConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';

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
}