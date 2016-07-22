import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

var Splash = require('./components/Splash');
var AppActions = require('./actions/AppActions');
var AppStore = require('./stores/AppStore');

class App extends Component{
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
    // if (AppStore.getAppToken()) {
    //   VideoActions.loadVideos();
    //   QuestionActions.loadQuestions();
    // }
  }

  _onChange() {
    // if (!QuestionStore.isLoading() && QuestionStore.getAll().length > 0 &&
    //     !VideoStore.isLoading() && VideoStore.getAll().length > 0) {
    //   NavigationActions.replace({route: RouteConstants.HOME});
    // }
  }

  render(){
    return (
      <Splash/>
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
