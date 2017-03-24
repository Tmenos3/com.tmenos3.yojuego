import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import NavigationActions from '../actions/NavigationActions';
import RouteConstants from '../constants/RouteConstants';
import Styles from '../constants/Styles';
import FullActivityIndicator from './common/FullActivityIndicator';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
      loginCompleted: false,
      loginErrorReturn: null,
      firstLogin: false
    }

    this._onLoginStoreChange = this._onLoginStoreChange.bind(this);
    this._forgetPassword = this._forgetPassword.bind(this);
    this._onLoginPressed = this._onLoginPressed.bind(this);
    this._onEmailTextChanged = this._onEmailTextChanged.bind(this);
    this._onPasswordTextChanged = this._onPasswordTextChanged.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._renderLoginError = this._renderLoginError.bind(this);
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onLoginStoreChange);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onLoginStoreChange);
  }

  _onLoginStoreChange() {
    this.setState({
      loading: LoginStore.isWorking(),
      loginCompleted: LoginStore.isLoginCompleted(),
      loginErrorReturn: LoginStore.loginErrorReturn(),
      firstLogin: LoginStore.isFirstLogin()
    }, () => {
      if (this.state.loginCompleted && !this.state.loginErrorReturn) {
        if (this.state.firstLogin) {
          NavigationActions.replaceRoute({
            id: RouteConstants.ROUTE_CREATE_PROFILE
          });
        } else {
          NavigationActions.replaceRoute({
            id: RouteConstants.ROUTE_HOME,
            data: { player: LoginStore.getPlayer() }
          });
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoginError()}
        <TouchableOpacity style={styles.facebookButtton} onPress={this._showFacebookLogin}>
          <Text style={styles.buttonText}>Facebook</Text>
          <Image style={styles.facebookImage} source={require('../statics/facebook-logo-white.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButtton} onPress={this._showGoogleLogin}>
          <Text style={styles.buttonText}>Google+</Text>
          <Image style={styles.googleImage} source={require('../statics/google-plus-logo-white.png')}></Image>
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Email"}
            style={styles.input}
            onChangeText={this._onEmailTextChanged}
            text={this.state.email}
            underlineColorAndroid={'transparent'}
            keyboardType={'email-address'}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={[styles.inputContainer, {
          marginBottom: Dimensions.get('window').width * 0.06
        }]}>
          <TextInput
            placeholder={"Contraseña"}
            style={styles.input}
            onChangeText={this._onPasswordTextChanged}
            text={this.state.password}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={this._forgetPassword}>
            <Text style={styles.text}>Olvide mi contraseña...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={this._onLoginPressed}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUp} onPress={this._showSignUp}>
          <Text style={styles.text}>{'No tengo cuenta! Quiero Registrarme'}</Text>
        </TouchableOpacity>
        {this._renderLoading()}
      </View>
    );
  }

  _renderLoading() {
    if (this.state.loading) {
      return (<FullActivityIndicator />)
    }
    return null;
  }

  _renderLoginError() {
    if (this.state.loginErrorReturn) {
      return (
        <Text style={styles.errorText}>{this.state.loginErrorReturn}</Text>
      )
    } else {
      return null;
    }
  }

  _showFacebookLogin() {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_FACEBOOK_LOGIN
    });
  }

  _showSignUp() {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_SIGNUP
    });
  }

  _showGoogleLogin() {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_GOOGLE_LOGIN
    });
  }

  _forgetPassword() {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_FORGET_PASSWORD
    });
  }

  _backPressed() {
    NavigationActions.back();
  }

  _onLoginPressed() {
    LoginActions.login(this.state.email, this.state.password);
  }

  _onEmailTextChanged(text) {
    this.setState({
      email: text
    });
  }

  _onPasswordTextChanged(text) {
    this.setState({
      password: text
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.MAIN_COLOR,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold'
  },
  facebookButtton: {
    width: Dimensions.get('window').width * 0.94,
    height: 40,
    backgroundColor: '#3b5998',
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
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  line: {
    width: Dimensions.get('window').width * 0.94,
    height: Dimensions.get('window').height * 0.03,
    borderBottomWidth: 1,
    borderColor: 'dimgray',
    marginTop: Dimensions.get('window').width * 0.06,
    marginBottom: Dimensions.get('window').width * 0.06
  },
  inputContainer: {
    marginTop: 10,
    height: 45,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white'
  },
  input: {
    width: Dimensions.get('window').width * 0.94,
    flex: 1,
    fontSize: 20,
    color: 'black'
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
    backgroundColor: 'rgb(0, 100, 0)'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red'
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