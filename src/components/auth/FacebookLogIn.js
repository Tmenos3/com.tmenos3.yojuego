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
      <WebView style={styles.container} source={{ uri: 'http://localhost:8080/login/facebook' }}/>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = FacebookLogIn;
