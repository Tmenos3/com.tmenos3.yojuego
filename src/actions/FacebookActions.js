import ApiService from '../services/ApiService';
import Dispatcher from '../dispatcher/Dispatcher';
import FacebookConstants from '../constants/FacebookConstants';
import LocalService from '../services/LocalService';

export default class FacebookActions {
  static auth(token) {
    ApiService.getUserInfo(token)
      .then((resp) => {
        LocalService.saveSession({
          token: resp.token,
          user: resp.user,
          player: resp.player
        })
          .then(() => {
            let isFirstLogin = LocalService.isFirstLogin();

            Dispatcher.handleViewAction({
              actionType: FacebookConstants.LOGIN_RESOLVED,
              payload: {
                isFirstLogin: isFirstLogin,
                player: resp.player
              }
            });
          });
      })
      .catch();
  }
}