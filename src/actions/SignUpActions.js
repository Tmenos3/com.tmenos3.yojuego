var SignUpConstants = require('../constants/SignUpConstants');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var ApiService = require('../services/ApiService');
var LocalService = require('../services/LocalService');


export default class SignUpActions {
  static signUp(email, password) {
    Dispatcher.handleViewAction({
      actionType: SignUpConstants.SIGNUP_INTENT
    });

    ApiService.signUp(email, password)
      .then((resp) => {
        LoginActions.setToken(resp.token);
        LocalService.saveUserId(resp.userid);

        Dispatcher.handleViewAction({
          actionType: SignUpConstants.SIGNUP_RESOLVED
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: SignUpConstants.SIGNUP_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: SignUpConstants.SIGNUP_FAILED,
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