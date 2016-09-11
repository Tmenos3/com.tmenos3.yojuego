import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import NavigationConstants from './constants/NavigationConstants';
import RouteConstants from './constants/RouteConstants';
import AppActions from './actions/AppActions';
import SessionStore from './stores/SessionStore';
import NavigationsActions from './actions/NavigationsActions';
import AppNavigator from './components/AppNavigator';

class App extends Component {
  constructor() {
    super()
    this._onSessionChange = this._onSessionChange.bind(this);
    this.state = {
      isInicilaizing: false,
      hasSession: false,
    };
  }

  componentDidMount() {
    AppActions.initializeApp();
    SessionStore.addChangeListener(this._onSessionChange);
  }

  _onSessionChange() {
    let session = SessionStore.getSession();
    if (session === null) {
      NavigationsActions.replaceRoute({
        id: RouteConstants.ROUTE_LOGIN,
        data: null
      });
    }
  }

  render() {
    return (
      <AppNavigator initialRoute={{ id: RouteConstants.ROUTE_SPLASH }}/>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    height: 200,
    backgroundColor: "black"
  }
});

module.exports = App;
