import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Picker,
  ActivityIndicator
} from 'react-native';
import EditMatchActions from '../../actions/EditMatchActions';
import EditMatchStore from '../../stores/EditMatchStore';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';
import Input from '../common/Input';

export default class EditMatchBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSavingMatch: false,
      errorSavingMatch: null,
      matchSaved: false,
      title: this.props.match.title,
      date: this.props.match.date,
      fromTime: this.props.match.fromTime,
      toTime: this.props.match.toTime,
      location: this.props.match.location,
      matchType: this.props.match.matchType,
      titleRequired: false,
      dateRequired: false,
      fromTimeRequired: false,
      toTimeRequired: false,
      matchTypeRequired: false,
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderError = this._renderError.bind(this);
    this._processConfirmation = this._processConfirmation.bind(this);
  }

  componentDidMount() {
    EditMatchStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    EditMatchStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderError()}
        <Input
          placeholder={"Descripcion"}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}
          containerStyle={{ borderColor: this.state.titleRequired ? 'red' : 'gray' }} />
        <Input
          placeholder={"Fecha"}
          onChangeText={(date) => this.setState({ date })}
          value={this.state.date}
          containerStyle={{ borderColor: this.state.dateRequired ? 'red' : 'gray' }} />
        <Input
          placeholder={"Hora desde"}
          onChangeText={(fromTime) => this.setState({ fromTime })}
          value={this.state.fromTime}
          containerStyle={{ borderColor: this.state.fromTimeRequired ? 'red' : 'gray' }} />
        <Input
          placeholder={"Hora hasta"}
          onChangeText={(toTime) => this.setState({ toTime })}
          value={this.state.toTime}
          containerStyle={{ borderColor: this.state.toTimeRequired ? 'red' : 'gray' }} />
        <Input
          placeholder={"Cancha"}
          onChangeText={(location) => this.setState({ location })}
          value={this.state.location} />
        <Picker
          selectedValue={this.state.matchType}
          onValueChange={(matchType) => this.setState({ matchType })}
          selectedValue={this.state.matchType}
          containerStyle={{ borderColor: this.state.matchTypeRequired ? 'red' : 'gray' }} >
          <Picker.Item label="11 vs 11" value={11} />
          <Picker.Item label="9 vs 9" value={9} />
          <Picker.Item label="7 vs 7" value={7} />
          <Picker.Item label="6 vs 6" value={6} />
          <Picker.Item label="5 vs 5" value={5} />
        </Picker>
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isMatchConfirmed: EditMatchStore.isMatchConfirmed(),
      isSavingMatch: EditMatchStore.isSavingMatch(),
      errorSavingMatch: EditMatchStore.getErrorSavingMatch(),
      matchSaved: EditMatchStore.isMatchSaved()
    }, () => {
      if (this.state.isMatchConfirmed) {
        this._processConfirmation();
      } else if (this.state.matchSaved && !this.state.isSavingMatch && !this.state.errorSavingMatch) {
        this.setState({ errorSavingMatch: 'Grupo guardado.' }, () => {
          setTimeout(() => {
            NavigationActions.back();
          }, 1500);
        });
      }
    });
  }

  _processConfirmation() {
    this.setState({
      titleRequired: !this.state.title,
      dateRequired: !this.state.date,
      fromTimeRequired: !this.state.fromTime,
      toTimeRequired: !this.state.fromTime,
      matchTypeRequired: !this.state.matchType,
      errorSavingMatch: !this.state.title || !this.state.date || !this.state.fromTime || !this.state.fromTime || !this.state.matchType ? 'Completa todos los datos obligatorios.' : null
    }, () => {
      if (!this.state.errorSavingMatch)
        EditMatchActions.editMatch(this.props.match._id,
          this.state.title,
          this.state.date,
          this.state.fromTime,
          this.state.toTime,
          this.state.matchType)
    });
  }

  _renderError() {
    if (this.state.errorSavingMatch) {
      return (
        <View>
          <Text style={[styles.text, { color: 'red' }]}>{this.state.errorSavingMatch}</Text>
        </View>
      )
    }

    return null;
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