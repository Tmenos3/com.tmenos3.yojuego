import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  WebView
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';
import GoogleActions from '../../actions/GoogleActions';
import GoogleStore from '../../stores/GoogleStore';

//const BASEURL = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081';
const BASEURL = 'http://192.168.0.14:8080';

export default class GoogleLogIn extends Component {
  constructor(props) {
    super(props);

    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      authCompleted: false,
      firstLogin: false
    }
  }

  componentDidMount() {
    GoogleStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    GoogleStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <WebView onNavigationStateChange={this._onLoad} style={styles.container} source={{ uri: BASEURL + '/auth/google' }} />
    );
  }

  _onLoad(state) {
    if (state.url.indexOf(BASEURL + '/auth/success') != -1) {
      let token = state.url.split("token=")[1];
      token = token.substring(0, token.length - 4);
      GoogleActions.auth(token);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});