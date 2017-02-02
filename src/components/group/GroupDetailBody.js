import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import GroupActions from '../../actions/GroupActions';
import NavigationActions from '../../actions/NavigationActions';
import GroupStore from '../../stores/GroupStore';
import RouteConstants from '../../constants/RouteConstants';

export default class GroupDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingGroup: false,
      errorLoadingGroup: null,
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._delete = this._delete.bind(this);
  }

  componentDidMount() {
    GroupStore.addChangeListener(this._onStoreChange);
    GroupActions.loadGroup(this.props.groupId);
  }

  componentWillUnmount() {
    FriendStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoading()}
        <Text style={styles.text}>Grupo</Text>
        <TouchableOpacity style={styles.dataRow} onPress={this._delete}>
          <Text style={styles.text}>Eliminar Grupo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isLoadingGroup: GroupStore.isLoadingGroup(),
      errorLoadingGroup: GroupStore.getErrorLoadingGroup(),
    });
  }


  _renderLoading() {
    if (this.state.isLoadingGroup) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderError(errorMessage) {
    if (errorMessage) {
      return (
        <View>
          <Text style={styles.text}>{errorMessage}</Text>
        </View>
      )
    }

    return null;
  }

  _delete() {
    GroupActions.delete(this.props.groupId);
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
  }
});