import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator
} from 'react-native';
import FriendActions from '../../actions/FriendActions';
import NavigationActions from '../../actions/NavigationActions';
import FriendStore from '../../stores/FriendStore';
import RouteConstants from '../../constants/RouteConstants';

export default class NewFriendBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSavingNewFriend: false,
      errorSavingNewFriend: null,
      errorMessage: '',
      email: '',
      phone: ''
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._onEmailTextChanged = this._onEmailTextChanged.bind(this);
    this._onPhoneTextChanged = this._onPhoneTextChanged.bind(this);
  }

  componentDidMount() {
    FriendStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    FriendStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoading()}
        <Text style={styles.text}>Nuevo Amigo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Email"}
            style={styles.input}
            onChangeText={this._onEmailTextChanged}
            text={this.state.email}
            underlineColorAndroid={'transparent'}
            />
        </View>
        <View style={[styles.inputContainer, {
          borderTopWidth: 0,
          marginBottom: Dimensions.get('window').width * 0.06
        }]}>
          <TextInput
            placeholder={"Phone"}
            style={styles.input}
            onChangeText={this._onPhoneTextChanged}
            text={this.state.email}
            underlineColorAndroid={'transparent'}
            />
        </View>
        {this._renderError()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isSavingNewFriend: FriendStore.isSavingNewFriend(),
      errorSavingNewFriend: FriendStore.getErrorSavingNewFriend()
    }, () => {
      if (FriendStore.isNewFriendConfirmed()) {
        if (!this.state.email && !this.state.phone) {
          this.setState({ errorSavingNewFriend: 'Completa al menos un dato.' });
        } else {
          FriendActions.confirmNewFriend(this.state.email, this.state.phone);
        }
      } else if (!this.state.isSavingNewFriend && !this.state.errorSavingNewFriend) {
        this.setState({ errorSavingNewFriend: 'Amigo guardado.' }, () => {
          setTimeout(() => {
            NavigationActions.back();
            FriendActions.friendsUpdated();
          }, 3000);
        });
      }
    });
  }


  _renderLoading() {
    if (this.state.isSavingNewFriend) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderError() {
    if (this.state.errorSavingNewFriend) {
      return (
        <View>
          <Text style={[styles.text, { color: 'red' }]}>{this.state.errorSavingNewFriend}</Text>
        </View>
      )
    }

    return null;
  }

  _onEmailTextChanged(text) {
    this.setState({
      email: text
    });
  }

  _onPhoneTextChanged(text) {
    this.setState({
      phone: text
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40
  },
  input: {
    width: Dimensions.get('window').width * 0.94
  },
});