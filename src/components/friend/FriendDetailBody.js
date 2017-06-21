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

export default class FriendDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idDeletingFriend: false,
      errorDeletingFriend: null,
      friendDeleted: false
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._delete = this._delete.bind(this);
    this._renderError = this._renderError.bind(this);
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
        {this._renderError(this.state.errorDeletingFriend)}
        <Text style={styles.text}>{this.props.friend.email}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={this._delete}>
          <Text style={styles.text}>Eliminar Amigo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isDeletingFriend: FriendStore.isDeletingFriend(),
      errorDeletingFriend: FriendStore.getErrorDeletingFriend(),
      friendDeleted: FriendStore.friendDeleted()
    }, () => {
      if (this.state.friendDeleted) {
        this.setState({ errorDeletingFriend: 'Amigo eliminado.' }, () => {
          setTimeout(() => {
            FriendActions.resetFriendDetail();
            NavigationActions.back();
          }, 1500);
        });
      }
    });
  }

  _renderLoading() {
    if (this.state.isDeletingFriend) {
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
    FriendActions.deleteFriend(this.props.friend._id);
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