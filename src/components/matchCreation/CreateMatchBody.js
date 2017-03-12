import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Picker,
  ActivityIndicator
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import CreateMatchActions from '../../actions/CreateMatchActions';
import RouteConstants from '../../constants/RouteConstants';
import CreateMatchStore from '../../stores/CreateMatchStore';

export default class CreateMatchBody extends Component {
  constructor(props) {
    super(props);

    this._selectFriends = this._selectFriends.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoadingFriends = this._renderLoadingFriends.bind(this);
    this._selectingFriendsBack = this._selectingFriendsBack.bind(this);
    this._selectingFriendsConfirm = this._selectingFriendsConfirm.bind(this);

    this.state = {
      matchType: 5,
      description: '',
      date: '',
      hourFrom: '',
      hourTo: '',
      field: '',
      friends: []
    }
  }

  componentDidMount() {
    CreateMatchStore.addChangeListener(this._onStoreChange);
    CreateMatchActions.loadFriends();
  }

  componentWillUnmount() {
    CreateMatchStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder={'Descripcion'} text={this.state.description} style={styles.textInput} onChangeText={(description) => this.setState({ description })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Fecha'} text={this.state.date} style={styles.textInput} onChangeText={(date) => this.setState({ date })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Hora desde'} text={this.state.hourFrom} style={styles.textInput} onChangeText={(hourFrom) => this.setState({ hourFrom })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Hora hasta'} text={this.state.hourTo} style={styles.textInput} onChangeText={(hourTo) => this.setState({ hourTo })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Cancha'} text={this.state.field} style={styles.textInput} onChangeText={(field) => this.setState({ field })} underlineColorAndroid={'transparent'} />
        <Picker selectedValue={this.state.matchType} onValueChange={(matchType) => this.setState({ matchType })}>
          <Picker.Item label="11 vs 11" value="11" />
          <Picker.Item label="9 vs 9" value="9" />
          <Picker.Item label="7 vs 7" value="7" />
          <Picker.Item label="6 vs 6" value="6" />
          <Picker.Item label="5 vs 5" value="5" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={this._selectFriends}>
          <Text style={styles.buttonText}>{'Invitar Jugadores'}</Text>
          {this._renderLoadingFriends()}
        </TouchableOpacity>
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isGettingFriends: CreateMatchStore.isGettingFriends(),
      errorGettingFriends: CreateMatchStore.getErrorGettingFriends()
    }, () => {
      // if (CreateMatchStore.isNewMatchConfirmed()) {
      //   if (!this.state.email) {
      //     this.setState({ errorSavingNewFriend: 'Completa el mail.' });
      //   } else {
      //     CreateMatchStore.confirmNewFriend(this.state.email);
      //   }
      // } else if (!this.state.isGettingFriends && !this.state.errorGettingFriends) {
      //   // this.setState({ errorSavingNewFriend: 'Amigo guardado.' }, () => {
      //   //   setTimeout(() => {
      //   //     // NavigationActions.back();
      //   //     // FriendActions.friendsUpdated();
      //   //   }, 3000);
      //   // });
      // }
    });
  }

  _selectFriends() {
    if (!this.state.isGettingFriends && !this.state.errorGettingFriends) {
      NavigationActions.addRoute({
        id: RouteConstants.ROUTE_FRIEND_LIST,
        data: {
          friends: CreateMatchStore.getFriends(),
          onBack: this._selectingFriendsBack,
          onConfirm: this._selectingFriendsConfirm
        }
      });
    }
  }

  _selectingFriendsBack() {
    NavigationActions.back();
  }

  _selectingFriendsConfirm(friendList) {
    this.setState({ friends: friendList }, () => {
      NavigationActions.back();
    });
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: Dimensions.get('window').width * 0.94,
    marginBottom: 5
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  }
});