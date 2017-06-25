import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import FriendActions from '../../actions/FriendActions';
import NavigationActions from '../../actions/NavigationActions';
import FriendStore from '../../stores/FriendStore';
import ModalMessage from '../common/ModalMessage';

export default class FriendDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idDeletingFriend: false,
      errorDeletingFriend: null,
      friendDeleted: false,
      deleteFriend: false,
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._delete = this._delete.bind(this);
    this._renderError = this._renderError.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderDeleteFriendConfirmationModal = this._renderDeleteFriendConfirmationModal.bind(this);
    this._confirmDeleteFriend = this._confirmDeleteFriend.bind(this);
    this._cancelDeleteFriend = this._cancelDeleteFriend.bind(this);
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
        {this._renderPhoto(this.props.friend.info.photo)}
        {
          this.props.friend.info.firstName ?
            <Text key={1} style={{ fontSize: 20 }}>{this.props.friend.info.firstName + ' ' + this.props.friend.info.lastName}</Text> :
            null
        }
        <Text key={2} style={{ fontSize: 20, textAlign: 'left' }}>{!this.props.friend.info.email ? '' : this.props.friend.info.email}</Text>
        <Text key={3} style={{ fontSize: 20, textAlign: 'left' }}>{!this.props.friend.info.phone ? '' : this.props.friend.info.phone}</Text>
        <Text style={styles.text}>{this.props.friend.email}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={this._delete}>
          <Text style={styles.text}>Eliminar Amigo</Text>
        </TouchableOpacity>
        {this._renderDeleteFriendConfirmationModal()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isDeletingFriend: FriendStore.isDeletingFriend(),
      errorDeletingFriend: FriendStore.getErrorDeletingFriend(),
      friendDeleted: FriendStore.friendDeleted(),
      deleteFriend: FriendStore.deleteFriend(),
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

  _renderPhoto(photo) {
    if (photo)
      return (
        <Image style={styles.photo} source={require('../../statics/no_photo_friend.png')}></Image>
      );

    return (
      <Image style={styles.photo} source={require('../../statics/no_photo_friend.png')}></Image>
    );
  }

  _renderDeleteFriendConfirmationModal() {
    if (this.state.deleteFriend) {
      let text = !this.props.friend.info.firstName ?
                  this.props.friend.info.email :
                  this.props.friend.info.firstName + ' ' + this.props.friend.info.lastName;
      return (
        <ModalMessage
          text={'Eliminar ' + text}
          confirm={this._confirmDeleteFriend}
          cancel={this._cancelDeleteFriend}
        />
      )
    }

    return null;
  }

  _confirmDeleteFriend() {
    FriendActions.deleteConfirmed(this.props.friend._id);
  }

  _cancelDeleteFriend() {
    FriendActions.cancelDeleteFriend();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  photo: {
    width: 140,
    height: 140
  },
});