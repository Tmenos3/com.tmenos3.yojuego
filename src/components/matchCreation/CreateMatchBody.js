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
import HomeActions from '../../actions/HomeActions';
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
    this._processConfirmation = this._processConfirmation.bind(this);

    this.state = {
      matchType: 5,
      description: '',
      date: '',
      hourFrom: '',
      hourTo: '',
      location: '',
      friends: [],
      descriptionRequired: '',
      dateRequired: '',
      hourFromRequired: '',
      hourToRequired: '',
      locationRequired: '',
      matchTypeRequired: '',
      isGettingFriends: false,
      errorGettingFriends: null,
      isNewMatchConfirmed: false,
      isSavingMatch: false,
      errorSavingMatch: null,
      matchSaved: false
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
        <TextInput placeholder={'Descripcion'} text={this.state.description} style={[styles.textInput, { borderColor: this.state.descriptionRequired ? 'red' : 'gray' }]} onChangeText={(description) => this.setState({ description })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Fecha'} text={this.state.date} style={[styles.textInput, { borderColor: this.state.dateRequired ? 'red' : 'gray' }]} onChangeText={(date) => this.setState({ date })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Hora desde'} text={this.state.hourFrom} style={[styles.textInput, { borderColor: this.state.hourFromRequired ? 'red' : 'gray' }]} onChangeText={(hourFrom) => this.setState({ hourFrom })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Hora hasta'} text={this.state.hourTo} style={[styles.textInput, { borderColor: this.state.hourToRequired ? 'red' : 'gray' }]} onChangeText={(hourTo) => this.setState({ hourTo })} underlineColorAndroid={'transparent'} />
        <TextInput placeholder={'Cancha'} text={this.state.location} style={[styles.textInput, { borderColor: this.state.locationRequired ? 'red' : 'gray' }]} onChangeText={(location) => this.setState({ location })} underlineColorAndroid={'transparent'} />
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
      errorGettingFriends: CreateMatchStore.getErrorGettingFriends(),
      isNewMatchConfirmed: CreateMatchStore.isNewMatchConfirmed(),
      isSavingMatch: CreateMatchStore.isSavingMatch(),
      errorSavingMatch: CreateMatchStore.getErrorSavingMatch(),
      matchSaved: CreateMatchStore.isMatchSaved()
    }, () => {
      if (this.state.isNewMatchConfirmed) {
        this._processConfirmation();
      } else if (this.state.matchSaved && !this.state.isSavingMatch && !this.state.errorSavingMatch) {
        this.setState({ errorSavingNewFriend: 'Partido guardado.' }, () => {
          setTimeout(() => {
            NavigationActions.back();
            CreateMatchActions.matchesUpdated();
          }, 3000);
        });
      }
    });
  }

  _processConfirmation() {
    let descriptionRequired = !this.state.description ? 'Completa la descripcion.' : null;
    let dateRequired = !this.state.date ? 'Completa fecha.' : null;
    let hourFromRequired = !this.state.hourFrom ? 'Completa la hora de inicio.' : null;
    let hourToRequired = !this.state.hourTo ? 'Completa la hora de finlaizacion.' : null;
    let locationRequired = false;
    let matchTypeRequired = !this.state.matchType ? 'Completa el tipo de partido.' : null;

    this.setState({
      descriptionRequired,
      dateRequired,
      hourFromRequired,
      hourToRequired,
      locationRequired,
      matchTypeRequired
    }, () => {
      if (!descriptionRequired && !dateRequired && !hourFromRequired && !hourToRequired && !locationRequired && !matchTypeRequired)
        CreateMatchActions.createMatch(this.state.description, this.state.date, this.state.hourFrom, this.state.hourTo, this.state.location, this.state.matchType, this.state.friends)
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