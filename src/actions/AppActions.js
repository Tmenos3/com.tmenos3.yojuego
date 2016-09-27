import {ToastAndroid} from 'react-native';

var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
// var LogHelper = require('../utilities/LogHelper');
var isLoggedIn = false;

var AppActions = {
  initializeApp: function () {
    Dispatcher.handleViewAction({
      actionType: AppConstants.INIT_APP
    });

    setTimeout(() => {
      AppActions.readyApp();
    }, 3000);
  },

  readyApp() {
    Dispatcher.handleViewAction({
      actionType: AppConstants.APP_READY
    });
  }
}
module.exports = AppActions;
