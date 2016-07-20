var ApiService = require('../services/ApiService');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var LogHelper = require('../utilities/LogHelper');

var AppActions = {
  getAppToken: function () {
    Dispatcher.handleViewAction({
      actionType: AppConstants.APP_GET_TOKEN
    });

    ApiService.getAppToken(AppStore.getScope(), AppStore.getClientId(), AppStore.getClientSecret()).then(response => {
      LogHelper.log("App TOKEN", response.Key);
      AppActions.setAppToken(response.Key);
    }, cause => {
      LogHelper.warning("AppActions.getAppToken(rejected)", cause);
    }).catch(error => {
      LogHelper.error("AppActions.getAppToken(catch)", error);
    });
  },

  setAppToken: function (token) {
    Dispatcher.handleServerAction({
      actionType: AppConstants.APP_SET_TOKEN,
      payload: token
    });
  }
};

module.exports = AppActions;