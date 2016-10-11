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
  },
  sendMailRestorePassword(mail) {
    Dispatcher.handleViewAction({
      actionType: SessionConstants.SEND_MAIL_RESTORE_PASSWORD,
      payload: {
        mail: mail
      }
    });

    ApiService.sendMailRestorePassword(SessionStore.getMail())
      .then(() => {
        SessionActions.mailSent(true, null);
      }, (cause) => {
        LogHelper.warning("SessionActions.mailSent(false, cause);", cause);
        SessionActions.mailSent(false, cause);
      })
      .catch((error) => {
        LogHelper.error("SessionActions.mailSent(false, error)", error);
        SessionActions.mailSent(false, error);
      });
  },
  mailSent(sent, error) {
    Dispatcher.handleServerAction({
      actionType: SessionConstants.MAIL_SENT,
      payload: {
        sent: sent,
        error: error
      }
    });
  }
};

module.exports = SessionActions;
