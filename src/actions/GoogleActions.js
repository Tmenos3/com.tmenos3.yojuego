import ApiService from '../services/ApiService';
import Dispatcher from '../dispatcher/Dispatcher';
import GoogleConstants from '../constants/GoogleConstants';
import LocalService from '../services/LocalService';

export default class GoogleActions {
  static auth(token) {
    let isFirstLogin = !LocalService.hasToken();
    GoogleActions.setToken(token);

    Dispatcher.handleViewAction({
      actionType: GoogleConstants.LOGIN_RESOLVED,
      payload: { isFirstLogin: isFirstLogin }
    });
  }

  static setToken(token) {
    LocalService.saveToken(token);
  }
}