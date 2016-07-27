import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

var NavigationConstants = require('./constants/NavigationConstants');
var RouteConstants = require('./constants/RouteConstants');
var AppActions = require('./actions/AppActions');
var AppStore = require('./stores/AppStore');
var NavigationsActions = require('./actions/NavigationsActions');
var AppNavigator = require('./components/AppNavigator');

class App extends Component{
  constructor(){
    super()
    this._onAppChange = this._onAppChange.bind(this);
    this.state = {
      isInicilaizing: false,
      hasSession: false,
    };
  }

  componentDidMount() {
    // QuestionStore.addChangeListener(this._onChange);
    // VideoStore.addChangeListener(this._onChange);
    // AppStore.addChangeListener(this._onAppChange);
    // AppActions.getAppToken();
    AppActions.initializeApp();
    AppStore.addChangeListener(this._onAppChange);
  }

  componentWillUnmount() {
    // QuestionStore.removeChangeListener(this._onChange);
    // VideoStore.removeChangeListener(this._onChange);
    // AppStore.removeChangeListener(this._onAppChange);
  }

  _onAppChange() {
    var session = AppStore.getSession();
    if(session === null){
      NavigationsActions.addRoute({
        id: RouteConstants.ROUTE_LOGIN,
        data: null
      });
    }
  }

  _onChange() {
    // if (!QuestionStore.isLoading() && QuestionStore.getAll().length > 0 &&
    //     !VideoStore.isLoading() && VideoStore.getAll().length > 0) {
    //   NavigationActions.replace({route: RouteConstants.HOME});
    // }
  }

  render(){
    return (
      <AppNavigator initialRoute={{id: RouteConstants.ROUTE_SPLASH, data: null}}/>
    );
  }
}

var styles = StyleSheet.create({
  video: {
    height: 200,
    backgroundColor: "black"
  }
});

module.exports = App;
