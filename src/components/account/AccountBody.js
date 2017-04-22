import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text
} from 'react-native';
import AccountActions from '../../actions/AccountActions';
import NavigationActions from '../../actions/NavigationActions';
import AccountStore from '../../stores/AccountStore';
import FullActivityIndicator from '../common/FullActivityIndicator';

export default class AccountBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.player.firstName,
      lastName: this.props.player.lastName,
      nickName: this.props.player.nickName,
      email: this.props.player.email,
      photo: this.props.player.photo,
      phone: this.props.player.phone,
      changesConfirmed: false,
      errorMessage: null,
      loading: false,
      isAccountSaved: false
    }

    this._onFieldChanged = this._onFieldChanged.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._isFormValid = this._isFormValid.bind(this);
    this._getErrorMessage = this._getErrorMessage.bind(this);
    this._showError = this._showError.bind(this);
    this._isEmptyOrNull = this._isEmptyOrNull.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
  }

  componentDidMount() {
    AccountStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._showError()}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"First Name"}
            style={styles.input}
            onChangeText={(text) => this._onFieldChanged('firstName', text)}
            value={this.state.firstName}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Last Name"}
            style={styles.input}
            onChangeText={(text) => this._onFieldChanged('lastName', text)}
            value={this.state.lastName}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Nick Name"}
            style={styles.input}
            onChangeText={(text) => this._onFieldChanged('nickName', text)}
            value={this.state.nickName}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"eMail"}
            style={styles.input}
            value={this.state.email}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Photo"}
            style={styles.input}
            onChangeText={(text) => this._onFieldChanged('photo', text)}
            value={this.state.photo}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Phone"}
            style={styles.input}
            onChangeText={(text) => this._onFieldChanged('phone', text)}
            value={this.state.phone}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
          />
        </View>
        {this._renderLoading()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      changesConfirmed: AccountStore.isAccountChangesConfirmed(),
      loading: AccountStore.isSaving(),
      errorMessage: AccountStore.getErrorSaving(),
      isAccountSaved: AccountStore.isAccountSaved()
    }, () => {
      if (!this.state.loading) {
        if (this.state.changesConfirmed) {
          if (this._isFormValid()) {
            AccountActions.save(this.state.firstName, this.state.lastName, this.state.nickName, this.state.email, this.state.photo, this.state.phone)
          } else {
            this.setState({
              errorMessage: this._getErrorMessage()
            });
          }
        } else if (this.state.isAccountSaved) {
          NavigationActions.resetToRoute({
            id: RouteConstants.ROUTE_HOME
          });
        }
      }
    });
  }

  _onFieldChanged(prop, text) {
    this.setState({
      [prop]: text
    });
  }

  _isFormValid() {
    return !this._isEmptyOrNull(this.state.firstName) &&
      !this._isEmptyOrNull(this.state.lastName) &&
      !this._isEmptyOrNull(this.state.nickName) &&
      !this._isEmptyOrNull(this.state.email);
  }

  _getErrorMessage() {
    let message = "";
    if (!this.state.firstName)
      message += 'First name is required.\n';

    if (!this.state.lastName)
      message += 'Last name is required.\n';

    if (!this.state.nickName)
      message += 'Nick name is required.\n';

    if (!this.state.email)
      message += 'Email name is required.\n';

    return message;
  }

  _showError() {
    if (this.state.errorMessage)
      return (
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      );

    return null;
  }

  _isEmptyOrNull(value) {
    return value == null || value == "" || value == undefined;
  }

  _renderLoading() {
    if (this.state.loading) {
      return (<FullActivityIndicator />)
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
  errorMessage: {
    color: 'red'
  }
});