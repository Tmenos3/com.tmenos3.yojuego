import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
// var LogHelper = require('../utilities/LogHelper');

export default class AppActions {
  static initializeApp() {
    Dispatcher.handleViewAction({
      actionType: AppConstants.INIT_APP
    });

    setTimeout(() => {
      Dispatcher.handleViewAction({
        actionType: AppConstants.APP_READY
      });
    }, 3000);
  }
}