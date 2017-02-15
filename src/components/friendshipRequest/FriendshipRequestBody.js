import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import FriendshipRequestActions from '../../actions/FriendshipRequestActions';
import HomeActions from '../../actions/HomeActions';
import NavigationActions from '../../actions/NavigationActions';
import FriendshipRequestStore from '../../stores/FriendshipRequestStore';

export default class FriendshipRequestBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendshipRequest: this.props.friendshipRequest,
      isSaving: false,
      errorSaving: null,
      action: null
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._renderError = this._renderError.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._accetp = this._accetp.bind(this);
    this._reject = this._reject.bind(this);
  }

  componentDidMount() {
    FriendshipRequestStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    FriendshipRequestStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderError(this.state.errorSaving)}
        {this._renderPhoto(this.props.friendshipRequest.sender.photo)}
        <Text key={1} style={{ fontSize: 20 }}>{this.props.friendshipRequest.sender.firstName + ' ' + this.props.friendshipRequest.sender.lastName}</Text>
        <Text key={2} style={{ fontSize: 16, textAlign: 'left' }}>{!this.props.friendshipRequest.sender.email ? '' : this.props.friendshipRequest.sender.email}</Text>
        <Text key={3} style={{ fontSize: 16, textAlign: 'left' }}>{!this.props.friendshipRequest.sender.phone ? '' : this.props.friendshipRequest.sender.phone}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this._accetp} style={[styles.button, { backgroundColor: 'green' }]}>
            <Text style={styles.menuText}>Accetp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._reject} style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.menuText}>Reject</Text>
          </TouchableOpacity>
        </View>
        {this._renderLoading(this.state.isSaving)}
      </View>
    );
  }

  _reject() {
    this.setState({ action: 'reject' }, () => {
      FriendshipRequestActions.reject(this.props.friendshipRequest);
    });
  }

  _accetp() {
    this.setState({ action: 'accetp' }, () => {
      FriendshipRequestActions.accept(this.props.friendshipRequest);
    });
  }

  _onStoreChange() {
    this.setState({
      isSaving: FriendshipRequestStore.isSaving(),
      errorSaving: FriendshipRequestStore.getErrorSaving()
    }, () => {
      if (!this.state.isSaving && !this.state.errorSaving)
        this.setState({ errorSavingNewFriend: 'Solicitud de amistad ' + (this.state.action == 'accept' ? 'aceptada.' : 'rechazada.') }, () => {
          setTimeout(() => {
            NavigationActions.back();
            HomeActions.updateFriends();
            HomeActions.loadFriendshipRequest();
          }, 1500);
        });
    });
  }

  _renderPhoto(photo) {
    if (photo)
      return (
        <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
      );

    return (
      <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
    );
  }

  _renderLoading(show) {
    if (show) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderError(message) {
    if (message) {
      return (
        <View>
          <Text style={[styles.text, { color: 'red' }]}>{message}</Text>
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
    alignItems: 'center',
    paddingTop: 10
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  friendPhoto: {
    width: 70,
    height: 70
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  }
});