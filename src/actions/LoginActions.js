import LoginConstants from '../constants/LoginConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import AppActions from '../actions/AppActions';


export default class LoginActions {
  static login(email, password) {
    Dispatcher.handleViewAction({
      actionType: LoginConstants.LOGIN_INTENT
    });

    let response = null;
    let newSession = null;
    ApiService.login(email, password)
      .then((resp) => {
        response = resp;
        return LocalService.getSession();
      })
      .then((session) => {
        newSession = {
          ...session,
          token: response.token,
          user: response.user,
          player: response.player
        }
        return LocalService.saveSession(newSession);
      })
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_RESOLVED,
          payload: {
            isFirstLogin: newSession.isFirstLogin,
            player: newSession.player
          }
        });
        AppActions.openWebSocket();
        AppActions.registerDevice();
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
};