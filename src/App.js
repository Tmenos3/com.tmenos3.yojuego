import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  InteractionManager
} from 'react-native';

import NavigationConstants from './constants/NavigationConstants';
import RouteConstants from './constants/RouteConstants';
import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';
import NavigationsActions from './actions/NavigationsActions';
import AppNavigator from './components/AppNavigator';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isInicilaizing: false,
      hasSession: false,
    };
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onAppSessionChange);
    
    InteractionManager.runAfterInteractions(() => {
      AppActions.initializeApp();
    });
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onAppSessionChange)
  }

  _onAppSessionChange() {
    if (AppStore.ready()) {
      NavigationsActions.replaceRoute({
        id: RouteConstants.ROUTE_LOGIN
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
