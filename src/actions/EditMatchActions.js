import EditMatchConstants from '../constants/EditMatchConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import HomeActions from '../actions/HomeActions';

export default class EditMatchActions {
  static confirm() {
    Dispatcher.handleViewAction({
      actionType: EditMatchConstants.CONFIRM
    });
  }

  static back() {
    Dispatcher.handleViewAction({
      actionType: EditMatchConstants.BACK
    });
  }

  static editMatch(id, title, date, fromTime, toTime, matchType) {
    Dispatcher.handleViewAction({
      actionType: EditMatchConstants.SAVING_MATCH
    });

    let matchSaved = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.editMatch(id, title, date, fromTime, toTime, matchType, token)
      })
      .then((resp) => {
        matchSaved = resp.resp;
        return LocalService.updateMatch(resp.resp);
      })
      .then((matches) => {
        Dispatcher.handleViewAction({
          actionType: EditMatchConstants.MATCH_SAVED,
          payload: {
            match: matchSaved
          }
        });

        HomeActions.loadMatches(matches);
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: EditMatchConstants.ERROR_SAVING_MATCH,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: EditMatchConstants.ERROR_SAVING_MATCH,
          payload: error.message
        });
      });;
  }

  static matchUpdated() {
    HomeActions.loadMatches();
  }
}