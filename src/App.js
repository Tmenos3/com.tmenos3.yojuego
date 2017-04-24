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
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

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
    AppStore.addChangeListener(this._onStoreChange);

    InteractionManager.runAfterInteractions(() => {
      AppActions.initializeApp();
    });
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onStoreChange)
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