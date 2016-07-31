import React, { Component } from 'react';
import { Navigator } from 'react-native';
var NavigationStore = require('../stores/NavigationStore');
var RouteConstants = require('../constants/RouteConstants');
var NavigationConstants = require('../constants/NavigationConstants');
var Splash = require('./Splash');
var LogIn = require('./LogIn');

var _navigator;

class AppNavigator extends Component {
  componentDidMount() {
    NavigationStore.addChangeListener(this._onNavigationStoreChange);
  }

  _onNavigationStoreChange() {
    switch (NavigationStore.getCurrentAction()) {
      case NavigationConstants.ADD_ROUTE:
        _navigator.push(NavigationStore.getCurrentRoute());
      break;
      case NavigationConstants.REPLACE_ROUTE:
        _navigator.replace(NavigationStore.getCurrentRoute());
      break;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {this.props.initialRoute}
        ref = {this._setNavigator}
        renderScene = {this._renderComponent}
        style = {{flex: 1}}
      />
    );
  }

  _setNavigator(navigatorInstance){
    if (_navigator == undefined || _navigator == null) {
      _navigator = navigatorInstance;
    }
  }

  _renderComponent(route, navigator){
    switch (route.id) {
      case RouteConstants.ROUTE_SPLASH:
        return (
          <Splash/>
        );
        break;
      case RouteConstants.ROUTE_LOGIN:
        return (
          <LogIn/>
        );
        break;
    }
  }
}

module.exports = AppNavigator;
