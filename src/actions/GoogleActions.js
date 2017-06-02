import ApiService from '../services/ApiService';
import Dispatcher from '../dispatcher/Dispatcher';
import GoogleConstants from '../constants/GoogleConstants';
import LocalService from '../services/LocalService';

export default class GoogleActions {
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
              actionType: GoogleConstants.LOGIN_RESOLVED,
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