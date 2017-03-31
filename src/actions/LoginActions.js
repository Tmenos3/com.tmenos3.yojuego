import LoginConstants from '../constants/LoginConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import AppActions from '../actions/AppActions';


export default class LoginActions {
  static login(email, password) {
    Dispatcher.handleViewAction({
      actionType: LoginConstants.LOGIN_INTENT
    });

    ApiService.login(email, password)
      .then((resp) => {
        // AppActions.setToken(resp.token);
        // LocalService.saveUser(resp.user);
        // LocalService.savePlayer(resp.player);
        LocalService.saveSession({
          token: resp.token,
          user: resp.user,
          player: resp.player
        })
          .then(() => {
            let isFirstLogin = LocalService.isFirstLogin();

            Dispatcher.handleViewAction({
              actionType: LoginConstants.LOGIN_RESOLVED,
              payload: {
                isFirstLogin: isFirstLogin,
                player: resp.player
              }
            });
          });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
};