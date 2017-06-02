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

const BASEURL = 'http://www.yojuego.com:8089';

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
      <WebView 
        onNavigationStateChange={this._onLoad} 
        style={styles.container} 
        source={{ uri: BASEURL + '/auth/google' }} 
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602" />
    );
  }

  _onLoad(state) {
    if (state.url.indexOf(BASEURL + '/auth/success') != -1) {
      let token = state.url.split("token=")[1];
      token = token.substring(0, token.length - 4);
      GoogleActions.auth(token);
    }
  }

  _onStoreChange() {
    this.setState({
      authCompleted: GoogleStore.isAuthCompleted(),
      firstLogin: GoogleStore.isFirstLogin()
    }, () => {
      if (this.state.authCompleted) {
        if (this.state.firstLogin) {
          NavigationActions.replaceRoute({
            id: RouteConstants.ROUTE_CREATE_PROFILE
          });
        } else {
          NavigationActions.replaceRoute({
            id: RouteConstants.ROUTE_HOME,
            data: { player: GoogleStore.getPlayer() }
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