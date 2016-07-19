import React, { Component } from 'react';
var AppNavigator = require('./components/AppNavigator');
var RouteConstants = require('./constants/RouteConstants');
var NavigationActions = require('./actions/NavigationActions');
var VideoActions = require('./actions/VideoActions');
var QuestionActions = require('./actions/QuestionActions')
var VideoStore = require('./stores/VideoStore');
var QuestionStore = require('./stores/QuestionStore');

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class App extends Component{
  componentDidMount() {
    QuestionStore.addChangeListener(this._onChange);
    VideoStore.addChangeListener(this._onChange);
    AppStore.addChangeListener(this._onAppChange);
    AppActions.getAppToken();
  }

  componentWillUnmount() {
    QuestionStore.removeChangeListener(this._onChange);
    VideoStore.removeChangeListener(this._onChange);
    AppStore.removeChangeListener(this._onAppChange);
  }

  _onAppChange() {
    if (AppStore.getAppToken()) {
      VideoActions.loadVideos();
      QuestionActions.loadQuestions();
    }
  }

  _onChange() {
    if (!QuestionStore.isLoading() && QuestionStore.getAll().length > 0 &&
        !VideoStore.isLoading() && VideoStore.getAll().length > 0) {
      NavigationActions.replace({route: RouteConstants.HOME});
    }
  }

  render(){
    return (
      <AppNavigator initialRoute={RouteConstants.SPLASH}/>
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
