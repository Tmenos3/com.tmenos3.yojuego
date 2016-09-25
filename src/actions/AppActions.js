import {ToastAndroid} from 'react-native';

// var ApiService = require('../services/ApiService');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
// var LogHelper = require('../utilities/LogHelper');
var isLoggedIn = false;

var AppActions = {
  initializeApp: function () {
    // Dispatcher.handleViewAction({
    //   actionType: AppConstants.INIT_APP
    // });
    Dispatcher.handleAction({
      actionType: AppConstants.INIT_APP
    });

    setTimeout(() => {
      AppActions.setSession(null);
    }, 3000);
  },

  setSession(session) {
    Dispatcher.handleAction({
      actionType: AppConstants.SET_SESSION,
      payload: session
    });
    // Dispatcher.handleViewAction({
    //   actionType: AppConstants.SET_SESSION,
    //   payload: session
    // });
  }
};

module.exports = AppActions;
