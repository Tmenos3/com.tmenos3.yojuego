import FriendshipRequestConstants from '../constants/FriendshipRequestConstants';
import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';


export default class FriendshipRequestActions {
  static accept(id) {
    Dispatcher.handleViewAction({
      actionType: FriendshipRequestConstants.ACCEPT_INTENT
    });

    ApiService.acceptFriendshipRequest(id, LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.ACCEPT_RESOLVED
        });
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

  static reject(id) {
    Dispatcher.handleViewAction({
      actionType: FriendshipRequestConstants.REJECT_INTENT
    });

    ApiService.rejectFriendshipRequest(id, LocalService.getToken())
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: FriendshipRequestConstants.REJECT_RESOLVED
        });
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