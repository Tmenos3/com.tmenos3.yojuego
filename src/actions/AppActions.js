import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';

export default class AppActions {
  static initializeApp() {
    Dispatcher.handleViewAction({
      actionType: AppConstants.INIT_APP
    });

    LocalService.getSession()
      .then((session) => {
        if (!session || !session.token) {
          AppActions._callLogin();
        } else {
          ApiService.renewToken(session.token)
            .then((resp) => {
              LocalService.saveSession({
                ...session,
                token: resp.token,
                user: resp.user,
                player: resp.player
              })
                .then(() => {
                  AppActions._callHome(resp.player);
                });
            }, (cause) => {
              AppActions._callLogin();
            })
            .catch(error => {
              AppActions._callLogin();
            });
        }
      });
  }

  static resetApp() {
    Dispatcher.handleViewAction({
      actionType: AppConstants.RESET_APP
    });
  }

  static setToken(token) {
    return LocalService.saveToken(token)
      .then(() => {
        Dispatcher.handleViewAction({
          actionType: AppConstants.TOKEN_CHANGE,
          payload: {
            token: token
          }
        });
      });
  }

  static _callLogin() {
    setTimeout(() => {
      Dispatcher.handleViewAction({
        actionType: AppConstants.APP_READY
      });
    }, 3000);
  }

  static _callHome(player) {
    setTimeout(() => {
      Dispatcher.handleViewAction({
        actionType: AppConstants.LOGIN_DONE,
        payload: player
      });
    }, 3000);
  }
}