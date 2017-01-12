import ApiService from '../services/ApiService';
import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import FacebookConstants from '../constants/FacebookConstants';
import LocalService from '../services/LocalService';

export default class FacebookActions {
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