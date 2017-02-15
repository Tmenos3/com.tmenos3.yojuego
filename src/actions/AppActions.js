import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';

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

  static resetApp() {
    Dispatcher.handleViewAction({
      actionType: AppConstants.RESET_APP
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