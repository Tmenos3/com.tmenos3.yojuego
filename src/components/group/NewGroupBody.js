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
import GroupActions from '../../actions/GroupActions';
import NavigationActions from '../../actions/NavigationActions';
import GroupStore from '../../stores/GroupStore';
import RouteConstants from '../../constants/RouteConstants';

export default class NewGroupBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSavingNewGroup: false,
      errorSavingNewGroup: null,
      errorMessage: '',
      description: ''
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._onDescriptionTextChanged = this._onDescriptionTextChanged.bind(this);
    // this._onPhoneTextChanged = this._onPhoneTextChanged.bind(this);
  }

  componentDidMount() {
    GroupStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoading()}
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
        {this._renderError()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isSavingNewGroup: GroupStore.isSavingNewGroup(),
      errorSavingNewGroup: GroupStore.getErrorSavingNewGroup()
    }, () => {
      if (GroupStore.isNewGroupConfirmed()) {
        if (!this.state.description) {
          this.setState({ errorSavingNewGroup: 'Completa al menos un dato.' });
        } else {
          GroupActions.confirmNewGroup(this.state.description);
        }
      } else if (!this.state.isSavingNewGroup && !this.state.errorSavingNewGroup) {
        this.setState({ errorSavingNewGroup: 'Amigo guardado.' }, () => {
          setTimeout(() => {
            NavigationActions.back();
            GroupActions.groupsUpdated();
          }, 3000);
        });
      }
    });
  }


  _renderLoading() {
    if (this.state.isSavingNewGroup) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
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
});