import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

var Splash = require('./components/Splash');
var SignIn = require('./components/SignIn');
var AppActions = require('./actions/AppActions');
var AppStore = require('./stores/AppStore');

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
    this.setState({
      isInicilaizing: AppStore.isInitilizing(),
      hasSession: session !== undefined,
    });
  }

  _onChange() {
    // if (!QuestionStore.isLoading() && QuestionStore.getAll().length > 0 &&
    //     !VideoStore.isLoading() && VideoStore.getAll().length > 0) {
    //   NavigationActions.replace({route: RouteConstants.HOME});
    // }
  }

  render(){
    if (this.state.isInitilizing){
      return (
        <Splash/>
      );
    }
    else if (this.state.hasSession) {
      return (
        <Splash/>
      );
    }
    else {
      return (
        <SignIn/>
      );
    }
  }
}

var styles = StyleSheet.create({
  video: {
    height: 200,
    backgroundColor: "black"
  }
});

module.exports = App;
