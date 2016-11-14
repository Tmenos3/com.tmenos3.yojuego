import ApiService from '../services/ApiService';
import MatchDetailConstants from '../constants/MatchDetailConstants';
import SessionStore from '../stores/SessionStore';
import Dispatcher from '../dispatcher/Dispatcher';
import controlExecutionTime from '../controlExecutionTime';

var TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFWZzc5XzJMaVloTGFCVWZKU1VZIiwiaWF0IjoxNDc5MDAzNDQxfQ.VpdRbHlgel7BOg5DBjqdQBjbMRjOfwvruCBHu7i8ZaI';
var WAITING_TIME = 5000;

var MatchDetailActions = {
  loadMatch(matchId) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.LOADING_MATCH_DETAIL,
      payload: null
    });

    let callback = () => {
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

    let doAfterTimeExpires = () => {
      Dispatcher.handleServerAction({
        actionType: MatchDetailConstants.TIME_EXPIRED_GETTING_MATCH_DETAIL,
        payload: {}
      });
    }

    controlExecutionTime(callback, WAITING_TIME, doAfterTimeExpires);
  },
  sendComment(playerId, matchId, comment) {
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
  },
  loadPlayers(playerIds) {
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

module.exports = MatchDetailActions;
