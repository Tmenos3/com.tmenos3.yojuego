import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  Text
} from 'react-native';
import NavigationsActions from '../../actions/NavigationsActions';
import NavigationConstants from '../../constants/NavigationConstants';
import RouteConstants from '../../constants/RouteConstants';

class FacebookLogIn extends Component {
  render() {
    return (
      <WebView onNavigationStateChange={this._onLoad} style={styles.container} source={{ uri: 'http://localhost:8080/login/facebook' }}/>
    );
  }

  _onLoad(a,b,c,d){

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = FacebookLogIn;
