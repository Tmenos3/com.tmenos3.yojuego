import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  WebView
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import NavigationConstants from '../../constants/NavigationConstants';
import RouteConstants from '../../constants/RouteConstants';
import SessionActions from '../../actions/SessionActions';

export default class GoogleLogIn extends Component {
  render() {
    return (
      <WebView onNavigationStateChange={this._onLoad} style={styles.container} source={{ uri: 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081/auth/google' }} />
    );
  }

  _onLoad(state) {
    console.log(state.url);
    if (state.url.indexOf('http://ec2-54-174-177-82.compute-1.amazonaws.com:8081/auth/success') != -1) {
      var token = state.url.split("token=")[1];
      SessionActions.setSession({ token: token });
      NavigationActions.back();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});