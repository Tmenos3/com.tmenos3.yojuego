import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  Text
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import NavigationConstants from '../../constants/NavigationConstants';
import RouteConstants from '../../constants/RouteConstants';
import SessionActions from '../../actions/SessionActions';
//var uri = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081/auth/facebook';
var BASEURL = 'http://192.168.0.11:8080';

class FacebookLogIn extends Component {
  render() {
    return (
      <WebView onNavigationStateChange={this._onLoad} style={styles.container} source={{ uri: BASEURL + '/auth/facebook' }}/>
    );
  }

  _onLoad(state) {
    console.log(state.url);
    if (state.url.indexOf(BASEURL + '/auth/success') != -1) {
      let token = state.url.split("token=")[1];
      token = token.substring(0, token.length - 4);
      NavigationActions.back();
      SessionActions.setSession(token);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = FacebookLogIn;
