import ApiService from '../services/ApiService';
import SessionConstants from '../constants/SessionConstants';
import Dispatcher from '../dispatcher/Dispatcher';
// var LogHelper = require('../utilities/LogHelper');

var SessionActions = {
  setSession(session) {
    Dispatcher.handleViewAction({
      actionType: SessionConstants.SET_SESSION,
      payload: session
    });

    if (!session.player) {
      ApiService.getPlayerByToken(session.token)
        .then((player) => {
          Dispatcher.handleServerAction({
            actionType: SessionConstants.SET_PLAYER,
            payload: player
          });
        }, () => {
          Dispatcher.handleServerAction({
            actionType: SessionConstants.SET_PLAYER,
            payload: null
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};

module.exports = SessionActions;
