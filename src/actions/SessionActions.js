import ApiService from '../services/ApiService';
import SessionConstants from '../constants/SessionConstants';
import SessionStore from '../stores/SessionStore';
import Dispatcher from '../dispatcher/Dispatcher';
import LogHelper from '../services/LogHelper';

var SessionActions = {
  setSession(token) {
    ApiService.getPlayerByToken(token)
      .then((response) => {
        Dispatcher.handleViewAction({
          actionType: SessionConstants.SET_SESSION,
          payload: {
            token: token,
            player: response.player
          }
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: SessionConstants.SET_SESSION,
          payload: {
            token: token,
            player: null
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: SessionConstants.SET_SESSION,
          payload: {
            token: token,
            player: null
          }
        });
      });


    // Dispatcher.handleViewAction({
    //   actionType: SessionConstants.SET_SESSION,
    //   payload: {
    //     token: token,
    //     player: player
    //   }
    // });
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
  },

  login(email, password) {
    Dispatcher.handleServerAction({
      actionType: SessionConstants.SESSION_LOGIN_INTENT,
      payload: {
        email: email,
        password: password
      }
    });
    let _token;
    ApiService.login(email, password)
      .then((response) => {
        return response.token;
      })
      .then((token) => {
        _token = token;
        return ApiService.getPlayerByToken(token);
      })
      .then((response) => {
        SessionActions.setSession(_token, response.resp);
      }, (cause) => {
        SessionActions.setError(cause);
      })
      .catch((error) => {
        SessionActions.setError(error);
      });
  },

  setError(error) {
    Dispatcher.handleServerAction({
      actionType: SessionConstants.SESSION_LOGIN_ERROR,
      payload: error
    });
  },
  signUpStepOne(email, password) {
    Dispatcher.handleServerAction({
      actionType: SessionConstants.SET_SIGNUP_STEPONE,
      payload: {
        email: email,
        password: password
      }
    });
  },

  signUpStepTwo(nickname, day, month, year, state, adminState) {
    Dispatcher.handleServerAction({
      actionType: SessionConstants.SET_SIGNUP_STEPTWO,
      payload: null
    });

    let info = SessionStore.getSignUpInfo();
    let _token;
    ApiService.signUp(info.email, info.password, nickname, day, month, year, state, adminState)
      .then((response) => {
        return response.token;
      })
      .then((token) => {
        //_token = token;
        //return ApiService.getPlayerByToken(token);
        SessionActions.setSession(token);
      })
      // .then((response) => {
      //   SessionActions.setSession(_token, response.resp);
      // }, (cause) => {
      //   SessionActions.setError(cause);
      // })
      .catch((error) => {
        SessionActions.setError(error);
      });
  }
};

module.exports = SessionActions;
