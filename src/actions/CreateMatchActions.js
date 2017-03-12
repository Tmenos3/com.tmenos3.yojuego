import CreateMatchConstants from '../constants/CreateMatchConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';

export default class CreateMatchActions {
  static confirm() {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.CONFIRM
    });
  }

  static back() {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.BACK
    });
  }

  static createMatch(matchInfo) {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.CREATE_MATCH,
      matchInfo
    });
  }

  static loadFriends() {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.LOADING_FRIENDS
    });

    LocalService.getFriends()
      .then((friends) => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.FRIENDS_LOADED,
          payload: friends
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.ERROR_LOADING_FRIENDS,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.ERROR_LOADING_FRIENDS,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
}