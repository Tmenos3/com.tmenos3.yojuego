import {ToastAndroid} from 'react-native';

// var ApiService = require('../services/ApiService');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
// var LogHelper = require('../utilities/LogHelper');
var isLoggedIn = false;

var AppActions = {
  initializeApp: function() {
    Dispatcher.handleViewAction({
      actionType: AppConstants.INIT_APP
    });

    setTimeout(() => {
      AppActions.setSession(null);

      if (isLoggedIn ){
        AppActions.setInitialProfile();
      }else{
        AppActions.setLogIn();
      };
    }, 3000);
  },

  setSession(session){
    Dispatcher.handleViewAction({
      actionType: AppConstants.SET_SESSION,
      payload: session
    });

    setTimeout(() => {ToastAndroid.show('Set session', ToastAndroid.SHORT);}, 1500);
  },

  setInitialProfile(){
    Dispatcher.handleViewAction({
      actionType: AppConstants.SET_INITIAL_PROFILE,
      //payload: session
    });

    setTimeout(() => {ToastAndroid.show('Set initial profile', ToastAndroid.SHORT);}, 1500);
  },

  setLogIn(){
    Dispatcher.handleViewAction({
      actionType: AppConstants.SET_LOG_IN,
      payload: null
    });

    setTimeout(() => {ToastAndroid.show('Set log in', ToastAndroid.SHORT);}, 1500);
  },
};

module.exports = AppActions;
