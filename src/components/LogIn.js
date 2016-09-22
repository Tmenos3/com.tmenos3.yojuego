import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator} from 'react-native';
import NavigationsActions from '../actions/NavigationsActions';
import NavigationConstants from '../constants/NavigationConstants';
import RouteConstants from '../constants/RouteConstants';
import SessionStore from '../stores/SessionStore';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this._onSessionChange = this._onSessionChange.bind(this);
    this.state = { loadingPlayer: false };
  }

  render() {
    if (this.state.loadingPlayer)
      return (
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, { height: 80 }]}
          size="large"
          />
      );

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._showFacebookLogin}>
          <Text> Facebook </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> Google </Text>
        </TouchableOpacity>
        <View>
          <TextInput placeholder={"usuario"} style={styles.textInput}/>
          <TextInput placeholder={"contraseña"} style={styles.textInput}/>
          <TouchableOpacity style={styles.button}>
            <Text> YoJuego </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showSignUp}>
            <Text style={styles.link}> No tienes cuenta??Registrate </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    SessionStore.addChangeListener(this._onSessionChange);
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(_onSessionChange);
  }

  _onSessionChange() {
    if (!SessionStore.getSession() || SessionStore.getSession() == null)
      return;

    if (SessionStore.getSession() != null && SessionStore.getSession().token != null) {
      if (SessionStore.loadingPlayer()) {
        this.setState({ loadingPlayer: true });
      } else {
        if (SessionStore.getSession().player && SessionStore.getSession().player != null) {
          // navegar al home
        } else {
          NavigationsActions.replaceRoute({
            id: RouteConstants.ROUTE_COMPLETE_SIGNUP
          });
        }
      }
    }
  }

  _showFacebookLogin() {
    NavigationsActions.addRoute({
      id: RouteConstants.ROUTE_FACEBOOK_LOGIN
    });
  }

  _showSignUp() {
    NavigationsActions.addRoute({
      id: RouteConstants.ROUTE_SIGNUP
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: 80,
    height: 20,
    backgroundColor: 'blue',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // text: {
  //   fontSize: 20,
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  textInput: {
    width: 80,
    height: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  link: {
    fontSize: 10,
    color: 'blue',
    textAlign: 'center',
  },
  // button: {
  //   width: 50,
  //   height: 25,
  //   backgroundColor: 'red'
  // },
  // buttonText: {
  //   height: 30,
  //   color: 'black',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   backgroundColor: "red",
  //   textAlign: 'center',
  // },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

module.exports = LogIn;
