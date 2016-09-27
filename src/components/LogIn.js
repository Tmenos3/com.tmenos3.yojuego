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
  }

  render() {
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
    SessionStore.removeChangeListener(this._onSessionChange);
  }

  _onSessionChange() {
    if (!SessionStore.getToken() || SessionStore.getToken() == null)
      return;

    if (!SessionStore.getPlayer() || SessionStore.getPlayer() == null) {
      NavigationsActions.replaceRoute({
        id: RouteConstants.ROUTE_COMPLETE_SIGNUP
      });
    } else {
      NavigationsActions.replaceRoute({
        id: RouteConstants.HOME
      });
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
