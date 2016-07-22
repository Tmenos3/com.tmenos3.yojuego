import {ToastAndroid} from 'react-native';

// var ApiService = require('../services/ApiService');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
// var LogHelper = require('../utilities/LogHelper');

var AppActions = {
  initializeApp: function() {
    Dispatcher.handleViewAction({
      actionType: AppConstants.INIT_APP
    });

    setTimeout(() => {AppActions.setSession();}, 3000);
  },

  setSession(session){
    Dispatcher.handleViewAction({
      actionType: AppConstants.SET_SESSION,
      payload: session
    });

    ToastAndroid.show('set session', ToastAndroid.SHORT)
  }
};

module.exports = AppActions;
