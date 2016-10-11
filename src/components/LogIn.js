import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native';
import NavigationsActions from '../actions/NavigationsActions';
import NavigationConstants from '../constants/NavigationConstants';
import RouteConstants from '../constants/RouteConstants';
import SessionStore from '../stores/SessionStore';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this._onSessionChange = this._onSessionChange.bind(this);
    this._forgetPassword = this._forgetPassword.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.facebookButtton} onPress={this._showFacebookLogin}>
          <Image style={styles.facebookImage} source={require('../statics/facebook-logo-white.png') }></Image>
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButtton} onPress={this._showGoogleLogin}>
          <Image style={styles.googleImage} source={require('../statics/google-plus-logo-white.png') }></Image>
          <Text style={styles.buttonText}>Google+</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <View style={styles.inputContainer}>
          <TextInput placeholder={"Email"} style={styles.input}/>
        </View>
        <View style={[styles.inputContainer, {
          borderTopWidth: 0,
          marginBottom: Dimensions.get('window').width * 0.06
        }]}>
          <TextInput placeholder={"Contraseña"} style={styles.input}/>
        </View>
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={this._showSignUp} onPress={this._forgetPassword}>
            <Text style={styles.text}>Olvide mi contraseña...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUp}>
          <Text style={styles.text}>{'No tengo cuenta! Quiero Registrarme'}</Text>
        </TouchableOpacity>
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

  _showGoogleLogin() {
    NavigationsActions.addRoute({
      id: RouteConstants.ROUTE_GOOGLE_LOGIN
    });
  }

  _forgetPassword() {
    NavigationsActions.addRoute({
      id: RouteConstants.ROUTE_FORGET_PASSWORD
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  facebookButtton: {
    width: Dimensions.get('window').width * 0.94,
    height: 40,
    backgroundColor: '#3b5998',
    marginTop: Dimensions.get('window').width * 0.03,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012
  },
  googleButtton: {
    width: Dimensions.get('window').width * 0.94,
    height: 40,
    backgroundColor: '#dc4d28',
    marginTop: Dimensions.get('window').width * 0.03,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  line: {
    width: Dimensions.get('window').width * 0.94,
    height: Dimensions.get('window').height * 0.03,
    borderBottomWidth: 0.7,
    borderColor: 'grey',
    marginBottom: Dimensions.get('window').width * 0.06
  },
  inputContainer: {
    borderWidth: 0.7,
    borderColor: 'grey'
  },
  input: {
    width: Dimensions.get('window').width * 0.94
  },
  loginContainer: {
    width: Dimensions.get('window').width * 0.94,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').width * 0.1
  },
  loginButton: {
    width: Dimensions.get('window').width * 0.3,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff'
  },
  text: {
    color: 'grey'
  },
  facebookImage: {
    width: 25,
    height: 25,
    position: 'absolute',
    left: 7,
    bottom: 7
  },
  googleImage: {
    width: 22,
    height: 22,
    position: 'absolute',
    left: 10,
    bottom: 9
  }
});

module.exports = LogIn;
