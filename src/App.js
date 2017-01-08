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
import NavigationActions from './actions/NavigationActions';
import AppNavigator from './components/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    
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
      NavigationActions.replaceRoute({
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