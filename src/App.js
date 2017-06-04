import React, { Component } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppActions from './actions/AppActions';
import AppNavigator from './components/AppNavigator';
import AppStore from './stores/AppStore';
import NavigationActions from './actions/NavigationActions';
import NavigationConstants from './constants/NavigationConstants';
import RouteConstants from './constants/RouteConstants';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

let id = 0;

export default class App extends Component {
  constructor(props) {
    super(props);

    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      appReady: false,
      loginDone: false
    }
  }

  componentDidMount() {
    // FCM.getFCMToken().then(token => {
    //   console.log(token)
    //   // store fcm token in your server
    // });

    // FCM.getInitialNotification()
    //   .then(notification => {
    //     if (notification && notification.myData) {
    //       alert(notification.myData);
    //     }
    //   });

    // //this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
    // this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {

    //   console.log(notif);
    //   // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    //   // if(notif.local_notification){
    //   //   //this is a local notification
    //   //   //Si la notif es local tengo que procesarla, de lo contrario quiere decir que viene del server,
    //   //   // puedo querer o bien actualizar info o bien generar una notif local para mostrar
    //   // }
    //   if (notif.opened_from_tray) {
    //     //app is open/resumed because user clicked banner
    //     console.log('hey!!!');
    //   }
    //   // await someAsyncCall();

    //   // if(Platform.OS ==='ios'){
    //   //   //optional
    //   //   //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
    //   //   //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
    //   //   //notif._notificationType is available for iOS platfrom
    //   //   switch(notif._notificationType){
    //   //     case NotificationType.Remote:
    //   //       notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
    //   //       break;
    //   //     case NotificationType.NotificationResponse:
    //   //       notif.finish();
    //   //       break;
    //   //     case NotificationType.WillPresent:
    //   //       notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
    //   //       break;
    //   //   }
    //   // }
    //   id = id + 1;
    //   if (id % 2 != 0) {
    //     FCM.presentLocalNotification({
    //       id: id,                               // (optional for instant notification)
    //       title: "My Notification Title",                     // as FCM payload
    //       body: "My Notification Message",                    // as FCM payload (required)
    //       sound: "default",                                   // as FCM payload
    //       priority: "high",                                   // as FCM payload
    //       click_action: "ACTION",                             // as FCM payload
    //       badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
    //       number: 10,                                         // Android only
    //       ticker: "My Notification Ticker",                   // Android only
    //       auto_cancel: true,                                  // Android only (default true)
    //       large_icon: "ic_launcher",                           // Android only
    //       icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
    //       big_text: "Show when notification is expanded",     // Android only
    //       sub_text: "This is a subText",                      // Android only
    //       color: "red",                                       // Android only
    //       vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
    //       tag: 'some_tag',                                    // Android only
    //       group: "group",                                     // Android only
    //       my_custom_data: 'my_custom_field_value',             // extra data you want to throw
    //       lights: true,                                       // Android only, LED blinking (default false)
    //       show_in_foreground: true                                  // notification when app is in foreground (local & remote)
    //     });
    //   }
    // });

    // this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
    //   console.log(token);
    //   //Update the new token here
    // });

    AppStore.addChangeListener(this._onStoreChange);

    InteractionManager.runAfterInteractions(() => {
      AppActions.initializeApp();
    });
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onStoreChange);
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }

  _onStoreChange() {
    this.setState({
      appReady: AppStore.ready(),
      loginDone: AppStore.isLoginDone()
    }, () => {
      if (this.state.appReady && !this.state.loginDone) {
        NavigationActions.replaceRoute({
          id: RouteConstants.ROUTE_LOGIN
        });
      } else if (this.state.appReady && this.state.loginDone) {
        NavigationActions.replaceRoute({
          id: RouteConstants.ROUTE_HOME,
          data: { player: AppStore.getPlayer() }
        });
      }
    });
  }

  render() {
    return (
      <AppNavigator initialRoute={{ id: RouteConstants.ROUTE_SPLASH }} />
    );
  }
}