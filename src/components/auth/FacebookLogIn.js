import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  WebView
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';
import FacebookActions from '../../actions/FacebookActions';
import FacebookStore from '../../stores/FacebookStore';

//const BASEURL = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081';
const BASEURL = 'http://192.168.0.14:8080';

export default class FacebookLogIn extends Component {
  constructor(props) {
    super(props);

    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      authCompleted: false,
      firstLogin: false
    }
  }

  componentDidMount() {
    FacebookStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    FacebookStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <WebView onNavigationStateChange={this._onLoad} style={styles.container} source={{ uri: BASEURL + '/auth/facebook' }} />
    );
  }

  _onLoad(state) {
    if (state.url.indexOf(BASEURL + '/auth/success') != -1) {
      let token = state.url.split("token=")[1];
      token = token.substring(0, token.length - 4);
      FacebookActions.auth(token);
    }
  }

  _onStoreChange() {
    this.setState({
      authCompleted: FacebookStore.isAuthCompleted(),
      firstLogin: FacebookStore.isFirstLogin()
    }, () => {
      if (this.state.authCompleted) {
        if (this.state.firstLogin) {
          NavigationActions.replaceRoute({
            id: RouteConstants.ROUTE_CREATE_PROFILE
          });
        } else {
          NavigationActions.replaceRoute({
            id: RouteConstants.ROUTE_HOME
          });
        }
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});