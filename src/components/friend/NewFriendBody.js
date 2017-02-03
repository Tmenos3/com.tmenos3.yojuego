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
import FriendActions from '../../actions/FriendActions';
import NavigationActions from '../../actions/NavigationActions';
import FriendStore from '../../stores/FriendStore';
import RouteConstants from '../../constants/RouteConstants';

export default class NewFriendBody extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._delete = this._delete.bind(this);
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
        <Text style={styles.text}>Amigo</Text>
      </View>
    );
  }

  _onStoreChange() {

  }


  _renderLoading() {
    if (this.state.isLoadingFriend) {
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
    FriendActions.deleteFriend(this.props.friendId);
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
  deleteButton: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    backgroundColor: 'red',
    height: 50,
    bottom: 0
  }
});