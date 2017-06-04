import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch,
  Image,
  ActivityIndicator
} from 'react-native';
import NewGroupActions from '../../actions/NewGroupActions';
import NewGroupStore from '../../stores/NewGroupStore';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';

export default class NewGroupBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSavingNewGroup: false,
      errorSavingNewGroup: null,
      errorMessage: '',
      friends: [],
      isGettingFriends: false,
      errorGettingFriends: null,
      description: ''
    }

    this._onStoreChange = this._onStoreChange.bind(this);

    this._renderError = this._renderError.bind(this);
    this._onDescriptionTextChanged = this._onDescriptionTextChanged.bind(this);
    this._selectFriends = this._selectFriends.bind(this);
    this._renderLoadingFriends = this._renderLoadingFriends.bind(this);
    this._selectingFriendsBack = this._selectingFriendsBack.bind(this);
    this._selectingFriendsConfirm = this._selectingFriendsConfirm.bind(this);
    this._processConfirmation = this._processConfirmation.bind(this);
  }

  componentDidMount() {
    NewGroupStore.addChangeListener(this._onStoreChange);
    NewGroupActions.loadFriends();
  }

  componentWillUnmount() {
    NewGroupStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nuevo Grupo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Descripcion"}
            style={styles.input}
            onChangeText={this._onDescriptionTextChanged}
            text={this.state.description}
            underlineColorAndroid={'transparent'}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this._selectFriends}>
          <Text style={styles.buttonText}>{'Agegar amigos'}</Text>
          {this._renderLoadingFriends()}
        </TouchableOpacity>
        {this._renderError()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isGettingFriends: NewGroupStore.isGettingFriends(),
      errorGettingFriends: NewGroupStore.getErrorGettingFriends(),
      isNewGroupConfirmed: NewGroupStore.isNewGroupConfirmed(),
      isSavingGroup: NewGroupStore.isSavingGroup(),
      errorSavingGroup: NewGroupStore.getErrorSavingGroup(),
      groupSaved: NewGroupStore.isGroupSaved()
    }, () => {
      if (this.state.isNewGroupConfirmed) {
        this._processConfirmation();
      } else if (this.state.groupSaved && !this.state.isSavingGroup && !this.state.errorSavingGroup) {
        this.setState({ errorSavingNewGroup: 'Grupo guardado.' }, () => {
          setTimeout(() => {
            NavigationActions.back();
            NewGroupActions.groupsUpdated();
          }, 3000);
        });
      }
    });
  }

  _processConfirmation() {
    this.setState({
      errorSavingNewGroup: !this.state.description ? 'Completa la descripcion.' : null
    }, () => {
      if (!this.state.errorSavingNewGroup)
        NewGroupActions.createGroup(this.state.description, this.state.friends, this.state.photo)
    });
  }

  _renderError() {
    if (this.state.errorSavingNewGroup) {
      return (
        <View>
          <Text style={[styles.text, { color: 'red' }]}>{this.state.errorSavingNewGroup}</Text>
        </View>
      )
    }

    return null;
  }

  _onDescriptionTextChanged(text) {
    this.setState({
      description: text
    });
  }

  _selectFriends() {
    if (!this.state.isGettingFriends && !this.state.errorGettingFriends) {
      NavigationActions.addRoute({
        id: RouteConstants.ROUTE_FRIEND_LIST,
        data: {
          friends: NewGroupStore.getFriends(),
          onBack: this._selectingFriendsBack,
          onConfirm: this._selectingFriendsConfirm
        }
      });
    }
  }

  _renderLoadingFriends() {
    if (this.state.isGettingFriends) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _selectingFriendsBack() {
    NavigationActions.back();
  }

  _selectingFriendsConfirm(friendList) {
    this.setState({ friends: friendList }, () => {
      NavigationActions.back();
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
  button: {
    width: Dimensions.get('window').width * 0.94,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});