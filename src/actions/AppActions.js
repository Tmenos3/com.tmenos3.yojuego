import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import GroupActions from './GroupActions';
import MatchDetailActions from './MatchDetailActions';

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

  static openWebSocket() {
    LocalService.getToken()
      .then(token => {
        ApiService.openWebSocket(token, AppActions._onopen, AppActions._onmessage, AppActions._onerror, AppActions._onclose);
      });
  }

  static _callLogin() {
    setTimeout(() => {
      Dispatcher.handleViewAction({
        actionType: AppConstants.APP_READY
      });
    }, 3000);
  }

  static _onopen() {
    //ws.send('something'); // send a message
    console.log('connection opened');
  }

  static _onmessage(e) {
    console.log(e.data);
    let msg = JSON.parse(e.data);
    switch (msg.type) {
      case 'GROUP':
        GroupActions.messageReceived(msg.groupId, msg.message);
        break;

      case 'MATCH':
        MatchDetailActions.commentReceived(msg.matchId, msg.comment);
        break;

      default:
        break;
    }
  }

  static _onerror(e) {
    console.log(e.message);
  }

  static _onclose(e) {
    console.log(e.code, e.reason);
  }

  static _callHome(player) {
    setTimeout(() => {
      Dispatcher.handleViewAction({
        actionType: AppConstants.LOGIN_DONE,
        payload: player
      });
    }, 3000);

    AppActions.openWebSocket();
  }
}