import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CompleteProfileInfoActions from '../../actions/CompleteProfileInfoActions';
import CompleteProfileInfoStore from '../../stores/CompleteProfileInfoStore';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';

export default class CompleteProfileInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameBorderColor: 'grey',
      lastNameColor: 'grey',
      firstName: '',
      lastName: '',
      nickname: '',
      canContinue: false,
      loading: false,
      proccessErrorReturn: null,
      proccessCompleted: false
    };

    this._onChangeNickname = this._onChangeNickname.bind(this);
    this._onChangeFirstName = this._onChangeFirstName.bind(this);
    this._onChangeLastName = this._onChangeLastName.bind(this);
    this._canContinue = this._canContinue.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderError = this._renderError.bind(this);
    this._okPressed = this._okPressed.bind(this);
    this._backPressed = this._backPressed.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
  }

  componentDidMount() {
    CompleteProfileInfoStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    CompleteProfileInfoStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderError()}
        <View style={[styles.inputContainer, { borderTopWidth: 0.5, borderColor: this.state.firstNameBorderColor }]}>
          <TextInput placeholder={"Nombre"}
            style={styles.input}
            returnKeyType={"done"}
            onChangeText={this._onChangeFirstName} />
        </View>
        <View style={[styles.inputContainer, { borderLeftWidth: 0.5, borderColor: this.state.lastNameBorderColor }]}>
          <TextInput placeholder={"Apellido"}
            style={styles.input}
            returnKeyType={"done"}
            onChangeText={this._onChangeLastName} />
        </View>
        <View style={[styles.inputContainer, { borderColor: 'gray', marginBottom: Dimensions.get('window').width * 0.06 }]}>
          <TextInput placeholder={"Apodo"}
            style={styles.input}
            returnKeyType={"done"}
            onChangeText={this._onChangeNickname} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: this.state.canContinue ? '#33adff' : 'grey' }]}
            onPress={this._okPressed}>
            <Text style={styles.buttonText}>Ok</Text>
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

  _renderLoading() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }
  }

  _renderError() {
    if (this.state.proccessErrorReturn) {
      return (
        <Text style={styles.errorText}>{this.state.proccessErrorReturn}</Text>
      )
    } else {
      return null;
    }
  }

  _onStoreChange() {
    this.setState({
      loading: CompleteProfileInfoStore.isWorking(),
      proccessCompleted: CompleteProfileInfoStore.isProccessCompleted(),
      proccessErrorReturn: CompleteProfileInfoStore.proccessErrorReturn()
    }, () => {
      if (this.state.proccessCompleted && !this.state.proccessErrorReturn) {
        NavigationActions.replaceRoute({
          id: RouteConstants.ROUTE_PLAYER_TOUR
        });
      }
    });
  }

  _canContinue() {
    this.setState({
      canContinue: this.state.firstName.length > 0 && this.state.lastName.length > 0
    });
  }

  _onChangeNickname(text) {
    if (text.length > 0) {
      this.setState({ nickname: text }, this._canContinue);
    }
  }

  _onChangeFirstName(text) {
    if (text.length <= 0) {
      this.setState({ firstNameBorderColor: 'red', firstName: null }, this._canContinue);
    } else {
      this.setState({ firstNameBorderColor: 'grey', firstName: text }, this._canContinue);
    }
  }

  _onChangeLastName(text) {
    if (text.length <= 0) {
      this.setState({ lastNameBorderColor: 'red', lastName: null }, this._canContinue);
    } else {
      this.setState({ lastNameBorderColor: 'grey', lastName: text }, this._canContinue);
    }
  }

  _okPressed() {
    if (this.state.canContinue) {
      CompleteProfileInfoActions.completeProfileInfo(this.state.firstName, this.state.lastName, this.state.nickname);
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
    borderWidth: 1,
    borderColor: 'grey',
    borderTopWidth: 0,
    height: 40
  },
  buttonContainer: {
    width: Dimensions.get('window').width * 0.94,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').width * 0.1
  },
  input: {
    width: Dimensions.get('window').width * 0.94,
    flex: 1
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red'
  }
});