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
        let list = Array.from(new Set(friends)); //removes duplicates
        return ApiService.createMatch(title, date, fromTime, toTime, location, matchType, list, token)
      })
      .then((resp) => {
        return LocalService.saveNewMatch(resp.resp);
      })
      .then((resp) => {
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

  static loadFriendsAndGroups() {
    CreateMatchActions._loadFriends();
    CreateMatchActions._loadGroups();
  }

  static matchesUpdated() {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.CLEAN_CREATE_MATCH
    });

    HomeActions.loadPlayerMatches();
  }

  static _loadFriends() {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.LOADING_FRIENDS
    });

    LocalService.getFriends()
      .then((friends) => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.FRIENDS_LOADED,
          payload: friends
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

  static _loadGroups() {
    Dispatcher.handleViewAction({
      actionType: CreateMatchConstants.LOADING_GROUPS
    });

    LocalService.getGroups()
      .then((groups) => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.GROUPS_LOADED,
          payload: groups
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: CreateMatchConstants.ERROR_LOADING_GROUPS,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
}