import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';
import SignUpActions from '../../actions/SignUpActions';
import SignUpStore from '../../stores/SignUpStore';

export default class SignUp extends Component {
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
      canContinue: false,
      loading: false,
      signUpErrorReturn: null,
      signUpCompleted: false
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderError = this._renderError.bind(this);
    this._canContinue = this._canContinue.bind(this);
    this._nextPressed = this._nextPressed.bind(this);

    this._onChangeUsername = this._onChangeUsername.bind(this);
    this._onChangeRepeatUsername = this._onChangeRepeatUsername.bind(this);
    this._onChangePassword = this._onChangePassword.bind(this);
    this._onChangeRepeatPassword = this._onChangeRepeatPassword.bind(this);
    this._backPressed = this._backPressed.bind(this);

  }

  componentDidMount() {
    SignUpStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    SignUpStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderError()}
        <View style={[styles.inputContainer, { borderTopWidth: 0.5, borderColor: this.state.usernameBorderColor }]}>
          <TextInput placeholder={"Mail"}
            style={styles.input}
            returnKeyType={"done"}
            onChangeText={this._onChangeUsername} />
        </View>
        <View style={[styles.inputContainer, { borderColor: this.state.repeatUsernameBorderColor }]}>
          <TextInput placeholder={"Confirmar mail"}
            style={styles.input}
            returnKeyType={"done"}
            onChangeText={this._onChangeRepeatUsername} />
        </View>
        <View style={[styles.inputContainer, { borderColor: this.state.passwordBorderColor }]}>
          <TextInput placeholder={"Contraseña"}
            style={styles.input}
            returnKeyType={"done"}
            secureTextEntry={true}
            onChangeText={this._onChangePassword} />
        </View>
        <View style={[styles.inputContainer, { borderColor: this.state.repeatPasswordBorderColor, marginBottom: Dimensions.get('window').width * 0.06 }]}>
          <TextInput placeholder={"Confirmar contraseña"}
            style={styles.input}
            returnKeyType={"done"}
            secureTextEntry={true}
            onChangeText={this._onChangeRepeatPassword} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.canContinue ? '#33adff' : 'grey' }]}
            onPress={this._nextPressed}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={this._backPressed}>
            <Text style={styles.buttonText}>Atrás</Text>
          </TouchableOpacity>
        </View>
        {this._renderLoading()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      loading: SignUpStore.isWorking(),
      signUpCompleted: SignUpStore.isSignUpCompleted(),
      signUpErrorReturn: SignUpStore.signUpErrorReturn()
    }, () => {
      if (this.state.signUpCompleted && !this.state.signUpErrorReturn) {
        NavigationActions.replaceRoute({
          id: RouteConstants.ROUTE_CREATE_PROFILE
        });
      }
    });
  }

  _canContinue() {
    this.setState({
      canContinue: this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.username == this.state.repeatUsername &&
      this.state.password == this.state.repeatPassword
    });
  }

  _renderLoading() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }
    return null;
  }

  _renderError() {
    if (this.state.signUpErrorReturn) {
      return (
        <Text style={styles.errorText}>{this.state.signUpErrorReturn}</Text>
      )
    } else {
      return null;
    }
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

  _nextPressed() {
    if (this.state.canContinue) {
      SignUpActions.signUp(this.state.username, this.state.password);
    }
  }

  _backPressed() {
    NavigationActions.replaceRoute({
      id: RouteConstants.ROUTE_LOGIN
    });
  }
}

const styles = StyleSheet.create({
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
  text: {
    color: 'grey'
  },
  errorText: {
    color: 'red'
  }
});