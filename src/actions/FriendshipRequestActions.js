import FriendshipRequestConstants from '../constants/FriendshipRequestConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import HomeActions from './HomeActions';

export default class FriendshipRequestActions {
  static accept(friendshipRequest) {
    Dispatcher.handleViewAction({
      actionType: FriendshipRequestConstants.ACCEPT_INTENT
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.acceptFriendshipRequest(friendshipRequest._id, token);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.ACCEPT_RESOLVED
        });

        FriendshipRequestActions.markAsRead(friendshipRequest._id);
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

    LocalService.getToken()
      .then((token) => {
        return ApiService.rejectFriendshipRequest(friendshipRequest._id, token)
          .then((resp) => {
            Dispatcher.handleViewAction({
              actionType: FriendshipRequestConstants.REJECT_RESOLVED
            });

            FriendshipRequestActions.markAsRead(friendshipRequest._id);
          })
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

    LocalService.getToken()
      .then((token) => {
        ApiService.markAsReadFriendshipRequest(id, token)
          .then((resp) => {
            Dispatcher.handleViewAction({
              actionType: FriendshipRequestConstants.MARK_AS_READ_RESOLVED
            });

            HomeActions.loadFriendshipRequest();
          })
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

  static newRequestReceived(id) {
    Dispatcher.handleViewAction({
      actionType: FriendshipRequestConstants.GETTING_NEW_REQUEST
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.getFriendshipRequest(id, token);
      })
      .then((resp) => {
        return LocalService.saveNewFriendshipRequest(resp.resp);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.NEW_REQUEST_GOT,
          payload: {
            friendshipRequests: resp
          }
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.ERROR_GETTING_NEW_REQUEST,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.ERROR_GETTING_NEW_REQUEST,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
};