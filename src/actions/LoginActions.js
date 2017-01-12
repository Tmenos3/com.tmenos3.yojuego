import LoginConstants from '../constants/LoginConstants';
import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';


export default class LoginActions {
  static login(email, password) {
    Dispatcher.handleViewAction({
      actionType: LoginConstants.LOGIN_INTENT
    });

    ApiService.login(email, password)
      .then((resp) => {
        LoginActions.setToken(resp.token);
        LocalService.saveUserId(resp.userid);

        Dispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_RESOLVED
        });
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

  static setToken(token) {
    LocalService.saveToken(token)
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: AppConstants.TOKEN_CHANGE,
          payload: {
            token: token
          }
        });
      });
  }
};