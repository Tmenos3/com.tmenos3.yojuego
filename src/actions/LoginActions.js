var LoginConstants = require('../constants/LoginConstants');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var ApiService = require('../services/ApiService');
var LocalService = require('../services/LocalService');


class LoginActions {
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
}

module.exports = LoginActions;