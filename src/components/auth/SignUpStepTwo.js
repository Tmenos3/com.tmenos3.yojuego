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
import PlayerStore from '../../stores/PlayerStore';
import PlayerActions from '../../actions/PlayerActions';

class SignUpStepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nicknameBorderColor: 'grey',
      dayBorderColor: 'grey',
      monthBorderColor: 'grey',
      yearBorderColor: 'grey',
      stateBorderColor: 'grey',
      adminStateBorderColor: 'grey',
      nickname: '',
      day: '',
      month: '',
      year: '',
      state: '',
      adminState: '',
      canContinue: false
    };

    this._onChangeNickname = this._onChangeNickname.bind(this);
    this._onChangeDay = this._onChangeDay.bind(this);
    this._onChangeMonth = this._onChangeMonth.bind(this);
    this._onChangeYear = this._onChangeYear.bind(this);
    this._onChangeState = this._onChangeState.bind(this);
    this._onChangeAdminState = this._onChangeAdminState.bind(this);
    this._canContinue = this._canContinue.bind(this);
    // this._onSignUpStepOneComplete = this._onSignUpStepOneComplete.bind(this);
    this._nextProfile = this._nextProfile.bind(this);
    this._backPressed = this._backPressed.bind(this);
  }

  componentDidMount() {
    // PlayerStore.addChangeListener(this._onSignUpStepOneComplete);

    if (Platform.OS === 'android') {
      var BackAndroid = require('react-native').BackAndroid;
      BackAndroid.addEventListener('hardwareBackPress', () => {
        this._backPressed();
        return true;
      });
    }
  }

  componentWillUnmount() {
    // PlayerStore.removeChangeListener(this._onSignUpStepOneComplete);

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
          <TextInput placeholder={"Nickname"}
            style={styles.input}
            returnKeyType = {"done"}
            onChangeText ={this._onChangeUsername }/>
        </View>

        <View style={styles.dateContainer}>
          <View style={[styles.inputDateContainer, { marginLeft: 0, width: Dimensions.get('window').width * 0.225, borderColor: this.state.repeatUsernameBorderColor }]}>
            <TextInput placeholder={"Día"}
              style={styles.input}
              returnKeyType = {"done"}
              onChangeText ={this._onChangeRepeatUsername }/>
          </View>
          <View style={[styles.inputDateContainer, { width: Dimensions.get('window').width * 0.225, borderColor: this.state.repeatUsernameBorderColor }]}>
            <TextInput placeholder={"Mes"}
              style={styles.input}
              returnKeyType = {"done"}
              onChangeText ={this._onChangeRepeatUsername }/>
          </View>
          <View style={[styles.inputDateContainer, { width: Dimensions.get('window').width * 0.45, borderColor: this.state.repeatUsernameBorderColor }]}>
            <TextInput placeholder={"Año"}
              style={styles.input}
              returnKeyType = {"done"}
              onChangeText ={this._onChangeRepeatUsername }/>
          </View>
        </View>
        <View style={[styles.inputContainer, { borderLeftWidth: 0.5, borderColor: this.state.passwordBorderColor }]}>
          <TextInput placeholder={"Estado"}
            style={styles.input}
            returnKeyType = {"done"}
            onChangeText ={this._onChangePassword }/>
        </View>
        <View style={[styles.inputContainer, { borderColor: this.state.repeatPasswordBorderColor, marginBottom: Dimensions.get('window').width * 0.06 }]}>
          <TextInput placeholder={"Admin state"}
            style={styles.input}
            returnKeyType = {"done"}
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

  // _onSignUpStepOneComplete() {
  //   if (PlayerStore.signUpStepOneComplete()) {
  //     NavigationsActions.addRoute({
  //       id: RouteConstants.ROUTE_SIGNUP_STEPTWO
  //     });
  //   }
  // }

  _canContinue() {
    this.setState({
      canContinue: this.state.nickname.length > 0 &&
      this.state.day.length > 0 &&
      this.state.month.length > 0 &&
      this.state.year.length > 0 &&
      this.state.state.length > 0 &&
      this.state.adminState.length > 0
    });
  }

  _onChangeNickname(text) {
    if (text.length <= 0) {
      this.setState({ nicknameBorderColor: 'red', nickname: null }, this._canContinue);
    } else {
      this.setState({ nicknameBorderColor: 'grey', nickname: text }, this._canContinue);
    }
  }

  _onChangeDay(text) {
    if (text.length <= 0) {
      this.setState({ dayBorderColor: 'red', day: null }, this._canContinue);
    } else {
      this.setState({ dayBorderColor: 'grey', day: text }, this._canContinue);
    }
  }

  _onChangeMonth(text) {
    if (text.length <= 0) {
      this.setState({ monthBorderColor: 'red', month: null }, this._canContinue);
    } else {
      this.setState({ monthBorderColor: 'grey', month: text }, this._canContinue);
    }
  }

  _onChangeYear(text) {
    if (text.length <= 0) {
      this.setState({ yearBorderColor: 'red', year: null }, this._canContinue);
    } else {
      this.setState({ yearBorderColor: 'grey', year: text }, this._canContinue);
    }
  }

  _onChangeState(text) {
    if (text.length <= 0) {
      this.setState({ stateBorderColor: 'red', state: null }, this._canContinue);
    } else {
      this.setState({ stateBorderColor: 'grey', state: text }, this._canContinue);
    }
  }

  _onChangeAdminState(text) {
    if (text.length <= 0) {
      this.setState({ adminStateBorderColor: 'red', adminState: null }, this._canContinue);
    } else {
      this.setState({ adminStateBorderColor: 'grey', adminState: text }, this._canContinue);
    }
  }

  _nextProfile() {
    if (this.state.canContinue) {
      PlayerActions.signUpStepTwo(this.state.nickname, this.state.day, this.state.month, this.state.year, this.state.state, this.state.adminState);
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
  inputDateContainer: {
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
  dateContainer: {
    width: Dimensions.get('window').width * 0.94,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
