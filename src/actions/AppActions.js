import AppConstants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import GroupActions from './GroupActions';
import MatchDetailActions from './MatchDetailActions';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

class AppActions {
  static _refreshTokenListener = null;
  static _notificationListener = null;

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

  static closeApp() {
    AppActions._refreshTokenListener.remove();
    AppActions._notificationListener.remove();
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

  static registerDevice() {
    FCM.getFCMToken()
      .then(deviceId => {
        return AppActions.refreshDeviceId(deviceId);
      })
  }

  static refreshDeviceId(deviceId) {
    LocalService.getSession()
      .then(session => {
        if (!session.deviceId) return ApiService.registerDevice(deviceId, 'ANDROID', session.token);
        else if (session.deviceId !== deviceId) return ApiService.updateDevice(session.user._id, session.deviceId, deviceId, 'ANDROID', session.token);
        else return Promise.resolve({ noChange: true });
      })
      .then(resp => {
        if (!resp.noChange)
          LocalService.updateDeviceId(deviceId);
      })
      .catch(error => {
        console.log('Error registering device: ' + error);
      });
  }

  static newNotificationReceived(notif) {
    console.log('New notification: ' + JSON.stringify(notif));
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
    AppActions.registerDevice();
  }
}

AppActions._refreshTokenListener = FCM.on(FCMEvent.RefreshToken, AppActions.refreshDeviceId);
AppActions._notificationListener = FCM.on(FCMEvent.Notification, AppActions.newNotificationReceived);

module.exports = AppActions;