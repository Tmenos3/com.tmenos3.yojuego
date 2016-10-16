import React, { Component } from 'react';
import { Navigator } from 'react-native';
import NavigationStore from '../stores/NavigationStore';
import RouteConstants from '../constants/RouteConstants';
import NavigationConstants from '../constants/NavigationConstants';
import Splash from './Splash';
import LogIn from './LogIn';
import InputMail from './InputMail';
import FacebookLogIn from './auth/FacebookLogIn';
import GoogleLogIn from './auth/GoogleLogin';
import SignUpStepOne from './auth/SignUpStepOne';
import SignUpStepTwo from './auth/SignUpStepTwo';
import PlayerSignUp from './auth/PlayerSignUp';
var _navigator;

class AppNavigator extends Component {
  componentDidMount() {
    NavigationStore.addChangeListener(this._onNavigationStoreChange);
  }

  _onNavigationStoreChange() {
    switch (NavigationStore.getCurrentAction()) {
      case NavigationConstants.ADD_ROUTE:
        _navigator.push({
          id: NavigationStore.getCurrentRoute().id,
          payload: NavigationStore.getCurrentRoute().data
        });
        break;
      case NavigationConstants.REPLACE_ROUTE:
        _navigator.replace({
          id: NavigationStore.getCurrentRoute().id,
          payload: NavigationStore.getCurrentRoute().data
        });
        break;
      case NavigationConstants.BACK:
        _navigator.pop();
        break;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {this.props.initialRoute}
        ref = {this._setNavigator}
        renderScene = {this._renderComponent}
        style = {{ flex: 1 }}
        />
    );
  }

  _setNavigator(navigatorInstance) {
    if (_navigator == undefined || _navigator == null) {
      _navigator = navigatorInstance;
    }
  }

  _renderComponent(route) {
    switch (route.id) {
      case RouteConstants.ROUTE_SPLASH:
        return (
          <Splash/>
        );
      case RouteConstants.ROUTE_LOGIN:
        return (
          <LogIn/>
        );
      case RouteConstants.ROUTE_FACEBOOK_LOGIN:
        return (
          <FacebookLogIn/>
        );
      case RouteConstants.ROUTE_GOOGLE_LOGIN:
        return (
          <GoogleLogIn/>
        );
      case RouteConstants.ROUTE_SIGNUP_STEPONE:
        return (
          <SignUpStepOne/>
        );
      case RouteConstants.ROUTE_SIGNUP_STEPTWO:
        return (
          <SignUpStepTwo/>
        );
      case RouteConstants.ROUTE_COMPLETE_SIGNUP:
        return (
          <PlayerSignUp/>
        );
      case RouteConstants.ROUTE_FORGET_PASSWORD:
        return (
          <InputMail/>
        );
    }
  }
}

module.exports = AppNavigator;
