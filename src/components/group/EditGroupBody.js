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
import EditGroupActions from '../../actions/EditGroupActions';
import EditGroupStore from '../../stores/EditGroupStore';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';

export default class EditGroupBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSavingGroup: false,
      errorSavingGroup: null,
      groupSaved: false,
      description: this.props.group.description,
      photo: this.props.group.photo
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderError = this._renderError.bind(this);
    this._onDescriptionTextChanged = this._onDescriptionTextChanged.bind(this);
    this._processConfirmation = this._processConfirmation.bind(this);
  }

  componentDidMount() {
    EditGroupStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    EditGroupStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Descripcion"}
            style={styles.input}
            onChangeText={this._onDescriptionTextChanged}
            value={this.state.description}
            underlineColorAndroid={'transparent'}
          />
        </View>
        {this._renderError()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isGroupConfirmed: EditGroupStore.isGroupConfirmed(),
      isSavingGroup: EditGroupStore.isSavingGroup(),
      errorSavingGroup: EditGroupStore.getErrorSavingGroup(),
      groupSaved: EditGroupStore.isGroupSaved()
    }, () => {
      if (this.state.isGroupConfirmed) {
        this._processConfirmation();
      } else if (this.state.groupSaved && !this.state.isSavingGroup && !this.state.errorSavingGroup) {
        this.setState({ errorSavingGroup: 'Grupo guardado.' }, () => {
          setTimeout(() => {
            NavigationActions.back();
            EditGroupActions.groupsUpdated();
          }, 3000);
        });
      }
    });
  }

  _processConfirmation() {
    this.setState({
      errorSavingGroup: !this.state.description ? 'Completa la descripcion.' : null
    }, () => {
      if (!this.state.errorSavingGroup)
        EditGroupActions.editGroup(this.props.group._id, this.state.description, this.state.photo)
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