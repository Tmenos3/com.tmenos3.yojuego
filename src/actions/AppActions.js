import AppConstants from '../constants/AppConstants';
import NotificationConstants from '../constants/NotificationConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';
import GroupActions from './GroupActions';
import MatchDetailActions from './MatchDetailActions';
import FriendshipRequestActions from './FriendshipRequestActions';
import FCM, { FCMEvent, NotificationType } from 'react-native-fcm';

export default class AppActions {
  static _refreshTokenListener = FCM.on(FCMEvent.RefreshToken, AppActions.refreshDeviceId);;
  static _notificationListener = FCM.on(FCMEvent.Notification, AppActions.newNotificationReceived);;

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
    if (notif.local_notification) AppActions._proccessLocalNotification(notif)
    else AppActions._proccessRemoteNotification(notif);
  }

  static pushLocalNotification(notif) {
    FCM.presentLocalNotification({
      id: notif.id,                               // (optional for instant notification)
      title: notif.title,                     // as FCM payload
      body: notif.body,                    // as FCM payload (required)
      sound: "default",                                   // as FCM payload
      priority: "high",                                   // as FCM payload
      click_action: "ACTION",                             // as FCM payload
      badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
      number: 10,                                         // Android only
      ticker: "My Notification Ticker",                   // Android only
      auto_cancel: true,                                  // Android only (default true)
      large_icon: "ic_launcher",                           // Android only
      icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
      big_text: notif.bigText,                      // Android only
      sub_text: notif.subtext,                      // Android only
      color: "red",                                       // Android only
      vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
      tag: 'some_tag',                                    // Android only
      group: "group",                                     // Android only
      data: {
        type: notif.type,
        data: notif.data
      },
      lights: true,                                       // Android only, LED blinking (default false)
      show_in_foreground: false                            // notification when app is in foreground (local & remote)
    });
  }

  static _proccessRemoteNotification(notif) {
    switch (notif.type) {
      case NotificationConstants.NEW_FRIENDSHIP_REQUEST:
        FriendshipRequestActions.newRequestReceived(notif.id);
        break;

      default:
        break;
    }
  }

  static _proccessLocalNotification(notif) {
    if (notif.opened_from_tray)
      switch (notif.data.type) {
        case NotificationConstants.NEW_FRIENDSHIP_REQUEST:
          FriendshipRequestActions.show(notif.data.data);
          break;

        default:
          break;
      }
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

// AppActions._refreshTokenListener = FCM.on(FCMEvent.RefreshToken, AppActions.refreshDeviceId);
// AppActions._notificationListener = FCM.on(FCMEvent.Notification, AppActions.newNotificationReceived);

// module.exports = AppActions;