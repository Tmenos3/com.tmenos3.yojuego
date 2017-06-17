import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import MatchDetailConstants from '../constants/MatchDetailConstants';
import Dispatcher from '../dispatcher/Dispatcher';

export default class MatchDetailActions {
  static confirm() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.MATCH_DETAIL_CONFIRM_INTENT
    });
  }

  static edit() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EDIT_MATCH
    });
  }

  static editShown() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EDIT_SHOWN
    });
  }

  static setMatch(match) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.SET_MATCH,
      payload: {
        match
      }
    });
  }

  static reset() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.RESET
    });
  }

  static exit() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EXIT_MATCH
    });
  }

  static cancel() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCEL_MATCH
    });
  }

  static cancelExitMatch() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCEL_EXIT_MATCH
    });
  }

  static cancelCancelMatch() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCEL_CANCEL_MATCH
    });
  }

  static cancelMatchConfirmed(matchId) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCELING_MATCH
    });

    let matchSaved = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.cancelMatch(matchId, token);
      })
      .then((resp) => {
        matchSaved = resp.resp;
        return LocalService.updateMatch(resp.resp);
      })
      .then((matches) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.MATCH_CANCELED,
          payload: {
            match: matchSaved
          }
        });

        HomeActions.loadMatches(matches);
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_CANCELING_MATCH,
          payload: {
            message: error.message
          }
        });
      });
  }

  static exitMatchConfirmed(matchId) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EXITING_MATCH
    });

    let matchSaved = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.exitMatch(matchId, token);
      })
      .then((resp) => {
        matchSaved = resp.resp;
        return LocalService.updateMatch(resp.resp);
      })
      .then((matches) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.MATCH_EXITED,
          payload: {
            match: matchSaved
          }
        });

        HomeActions.loadMatches(matches);
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_EXITING_MATCH,
          payload: {
            message: error.message
          }
        });
      });
  }
};