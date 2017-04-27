import CreateMatchConstants from '../constants/CreateMatchConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import HomeActions from '../actions/HomeActions';

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

  static createMatch(title, date, fromTime, toTime, location, matchType, friends) {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.SAVING_MATCH
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.createMatch(title, date, fromTime, toTime, location, matchType, friends.map(friend => { return friend.friendId }), token)
      })
      .then((resp) => {
        //save match in local service
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.MATCH_SAVED
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.ERROR_SAVING_MATCH,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.ERROR_SAVING_MATCH,
          payload: error.message
        });
      });;
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

  static matchesUpdated() {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.CLEAN_CREATE_MATCH
    });

    HomeActions.loadPlayerMatches();
  }
}