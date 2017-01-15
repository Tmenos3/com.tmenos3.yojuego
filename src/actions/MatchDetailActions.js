import ApiService from '../services/ApiService';
import MatchDetailConstants from '../constants/MatchDetailConstants';
// import SessionStore from '../stores/SessionStore';
import Dispatcher from '../dispatcher/Dispatcher';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFWZzc5XzJMaVloTGFCVWZKU1VZIiwiaWF0IjoxNDc5MDAzNDQxfQ.VpdRbHlgel7BOg5DBjqdQBjbMRjOfwvruCBHu7i8ZaI';
const WAITING_TIME = 5000;

export default class MatchDetailActions {
  static loadMatch(matchId) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.LOADING_MATCH_DETAIL,
      payload: null
    });

    //ApiService.getMatchInfo(matchId, SessionStore.getToken())
    ApiService.getMatchInfo(matchId, TOKEN)
      .then((match) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.MATCH_DETAIL_GOT,
          payload: {
            match: match,
          }
        });
      }, (cause) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.ERROR_GETTING_MATCH_DETAIL,
          payload: {
            error: cause,
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.ERROR_GETTING_MATCH_DETAIL,
          payload: {
            error: error,
          }
        });
      });
  }

  static sendComment(playerId, matchId, comment) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.SENDING_COMMENT,
      payload: {}
    });

    ApiService.sendComment(playerId, matchId, comment, TOKEN)
      .then((match) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.COMMENT_SENT,
          payload: match
        });
      }, (cause) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.ERROR_SENDING_COMMENT,
          payload: {
            error: cause,
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.ERROR_SENDING_COMMENT,
          payload: {
            error: error,
          }
        });
      });
  }

  static loadPlayers(playerIds) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.LOADING_PLAYERS,
      payload: null
    });

    //ApiService.getPlayers(playerIds, SessionStore.getToken())
    ApiService.getPlayers(playerIds, TOKEN)
      .then((players) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.PLAYERS_GOT,
          payload: {
            players: players,
          }
        });
      }, (cause) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.ERROR_GETTING_PLAYERS,
          payload: {
            error: cause,
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleServerAction({
          actionType: MatchDetailConstants.ERROR_GETTING_PLAYERS,
          payload: {
            error: error,
          }
        });
      });
  }
};