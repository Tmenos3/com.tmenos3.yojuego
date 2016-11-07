import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Dimensions,
  Platform,
  StyleSheet} from 'react-native';
import NavigationsActions from '../../actions/NavigationsActions';
import RouteConstants from '../../constants/RouteConstants';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';

class SignUpStepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBorderColor: 'grey',
      repeatUsernameBorderColor: 'grey',
      passwordBorderColor: 'grey',
      repeatPasswordBorderColor: 'grey',
      username: '',
      repeatUsername: '',
      password: '',
      repeatPassword: '',
      canContinue: false
    };

    this._onChangeUsername = this._onChangeUsername.bind(this);
    this._onChangeRepeatUsername = this._onChangeRepeatUsername.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._onChangeRepeatPassword = this._onChangeRepeatPassword.bind(this);
    this._canContinue = this._canContinue.bind(this);
    this._onSignUpStepOneComplete = this._onSignUpStepOneComplete.bind(this);
    this._nextProfile = this._nextProfile.bind(this);
    this._backPressed = this._backPressed.bind(this);

  }

  componentDidMount() {
    SessionStore.addChangeListener(this._onSignUpStepOneComplete);

    if (Platform.OS === 'android') {
      var BackAndroid = require('react-native').BackAndroid;
      BackAndroid.addEventListener('hardwareBackPress', () => {
        this._backPressed();
        return true;
      });
    }
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onSignUpStepOneComplete);

    if (Platform.OS === 'android') {
      var BackAndroid = require('react-native').BackAndroid;
      BackAndroid.removeEventListener('hardwareBackPress', () => {
        this._backPressed();
        return true;
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.inputContainer, { borderTopWidth: 0.5, borderColor: this.state.usernameBorderColor }]}>
          <TextInput placeholder={"Mail"}
            style={styles.input}
            returnKeyType = {"done"}
            onChangeText ={this._onChangeUsername }/>
        </View>
        <View style={[styles.inputContainer, { borderColor: this.state.repeatUsernameBorderColor }]}>
          <TextInput placeholder={"Confirmar mail"}
            style={styles.input}
            returnKeyType = {"done"}
            onChangeText ={this._onChangeRepeatUsername }/>
        </View>
        <View style={[styles.inputContainer, { borderColor: this.state.passwordBorderColor }]}>
          <TextInput placeholder={"Contraseña"}
            style={styles.input}
            returnKeyType = {"done"}
            secureTextEntry = {true}
            onChangeText ={this._onChangePassword }/>
        </View>
        <View style={[styles.inputContainer, { borderColor: this.state.repeatPasswordBorderColor, marginBottom: Dimensions.get('window').width * 0.06 }]}>
          <TextInput placeholder={"Confirmar contraseña"}
            style={styles.input}
            returnKeyType = {"done"}
            secureTextEntry = {true}
            onChangeText ={this._onChangeRepeatPassword }/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.canContinue ? '#33adff' : 'grey' }]}
            onPress={this._nextProfile}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={this._backPressed}>
            <Text style={styles.buttonText}>Atrás</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  _onSignUpStepOneComplete() {
    if (SessionStore.signUpStepOneComplete()) {
      NavigationsActions.addRoute({
        id: RouteConstants.ROUTE_SIGNUP_STEPTWO
      });
    }
  }

  _canContinue() {
    this.setState({
      canContinue: this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.username == this.state.repeatUsername &&
      this.state.password == this.state.repeatPassword
    });
  }

  _onChangeUsername(text) {
    if (text.length <= 0) {
      this.setState({ usernameBorderColor: 'red', username: null }, this._canContinue);
    } else {
      this.setState({ usernameBorderColor: 'grey', username: text }, this._canContinue);
    }
  }

  _onChangeRepeatUsername(text) {
    if (text.length <= 0) {
      this.setState({ repeatUsernameBorderColor: 'red', repeatUsername: null }, this._canContinue);
    } else {
      if (this.state.username != text) {
        this.setState({ repeatUsernameBorderColor: 'red', repeatUsername: null }, this._canContinue);
      } else {
        this.setState({ repeatUsernameBorderColor: 'grey', repeatUsername: text }, this._canContinue);
      }
    }
  }

  _onChangePassword(text) {
    if (text.length <= 0) {
      this.setState({ passwordBorderColor: 'red', password: null }, this._canContinue);
    } else {
      this.setState({ passwordBorderColor: 'grey', password: text }, this._canContinue);
    }
  }

  _onChangeRepeatPassword(text) {
    if (text.length <= 0) {
      this.setState({ repeatPasswordBorderColor: 'red', repeatPassword: null }, this._canContinue);
    } else {
      if (this.state.password != text) {
        this.setState({ repeatPasswordBorderColor: 'red', repeatPassword: null }, this._canContinue);
      } else {
        this.setState({ repeatPasswordBorderColor: 'grey', repeatPassword: text }, this._canContinue);
      }
    }
  }

  _nextProfile() {
    if (this.state.canContinue) {
      SessionActions.signUpStepOne(this.state.username, this.state.password);
    }
  }

  _backPressed() {
    NavigationsActions.replaceRoute({
      id: RouteConstants.ROUTE_LOGIN
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
  button: {
    width: Dimensions.get('window').width * 0.3,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff'
  },
  inputContainer: {
    borderWidth: 0.7,
    borderColor: 'grey',
    borderTopWidth: 0
  },
  buttonContainer: {
    width: Dimensions.get('window').width * 0.94,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').width * 0.1
  },
  input: {
    width: Dimensions.get('window').width * 0.94
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

module.exports = SignUpStepOne;
