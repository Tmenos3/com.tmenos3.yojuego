import ApiService from '../services/ApiService';
import SessionConstants from '../constants/SessionConstants';
import SessionStore from '../stores/SessionStore';
import Dispatcher from '../dispatcher/Dispatcher';
import LogHelper from '../services/LogHelper';

var SessionActions = {
  setSession(token, player) {
    Dispatcher.handleViewAction({
      actionType: SessionConstants.SET_SESSION,
      payload: {
        token: token,
        player: player
      }
    });
  }
};

module.exports = SessionActions;
