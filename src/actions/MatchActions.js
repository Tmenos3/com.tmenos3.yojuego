import ApiService from '../services/ApiService';
import MatchConstants from '../constants/MatchConstants';
import SessionStore from '../stores/SessionStore';
import Dispatcher from '../dispatcher/Dispatcher';

export default class MatchActions {
  static getMatchDetail(idMatch) {
    Dispatcher.handleViewAction({
      actionType: MatchConstants.GET_MATCH_DETAIL,
      payload: {
        id: idMatch,
      }
    });

    ApiService.getMatchInfo(idMatch, SessionStore.getToken())
      .then((match) => {
        Dispatcher.handleServerAction({
          actionType: MatchConstants.MATCH_DETAIL_GOT,
          payload: {
            match: match,
          }
        });
      }, (cause) => {
        Dispatcher.handleServerAction({
          actionType: MatchConstants.ERROR_GETTING_MATCH_DETAIL,
          payload: {
            error: cause,
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleServerAction({
          actionType: MatchConstants.ERROR_GETTING_MATCH_DETAIL,
          payload: {
            error: error,
          }
        });
      });
  }
};