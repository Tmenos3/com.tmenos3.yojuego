import FriendshipRequestConstants from '../constants/FriendshipRequestConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import HomeActions from '../actions/HomeActions';


export default class FriendshipRequestActions {
  static accept(friendshipRequest) {
    Dispatcher.handleViewAction({
      actionType: FriendshipRequestConstants.ACCEPT_INTENT
    });

    ApiService.acceptFriendshipRequest(friendshipRequest.friendship._id, LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.ACCEPT_RESOLVED
        });

        FriendshipRequestActions.markAsRead(friendshipRequest._id);
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.ACCEPT_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.ACCEPT_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static reject(friendshipRequest) {
    Dispatcher.handleViewAction({
      actionType: FriendshipRequestConstants.REJECT_INTENT
    });

    ApiService.rejectFriendshipRequest(friendshipRequest.friendship._id, LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.REJECT_RESOLVED
        });

        FriendshipRequestActions.markAsRead(friendshipRequest._id);
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.REJECT_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.REJECT_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static markAsRead(id) {
    Dispatcher.handleViewAction({
      actionType: FriendshipRequestConstants.MARK_AS_READ_INTENT
    });

    ApiService.markAsReadFriendshipRequest(id, LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.MARK_AS_READ_RESOLVED
        });

        HomeActions.loadFriendshipRequest();
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.MARK_AS_READ_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.MARK_AS_READ_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
};