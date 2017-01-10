var FacebookConstants = require('../constants/FacebookConstants');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var ApiService = require('../services/ApiService');
var LocalService = require('../services/LocalService');


class FacebookActions {
  static auth(token) {
    let isFirstLogin = !LocalService.hasToken();
    FacebookActions.setToken(token);

    Dispatcher.handleViewAction({
      actionType: FacebookConstants.LOGIN_RESOLVED,
      payload: { isFirstLogin: isFirstLogin }
    });
  }

  static setToken(token) {
    LocalService.saveToken(token);
  }
}

module.exports = FacebookActions;