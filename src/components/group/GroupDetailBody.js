import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  BackAndroid
} from 'react-native';
import ModalMessage from '../common/ModalMessage';
import GroupActions from '../../actions/GroupActions';
import NavigationActions from '../../actions/NavigationActions';
import GroupStore from '../../stores/GroupStore';
import RouteConstants from '../../constants/RouteConstants';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const ACTION_TIMER = 400;

export default class GroupDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingGroup: false,
      isDeletingGroup: false,
      isExitingGroup: false,
      isRemovingPlayer: false,
      isAddingFriends: false,
      isMakingAdminPlayer: false,
      errorLoadingGroup: null,
      errorDeletingGroup: null,
      errorExitingGroup: null,
      errorRemovingPlayer: null,
      errorAddingPlayers: null,
      errorMakingAdminPlayer: null,
      group: null,
      dsFriends: ds.cloneWithRows([]),
      deleteGroup: false,
      removePlayer: false,
      makeAdminPlayer: false,
      groupDeleted: false,
      exitGroup: false,
      groupExited: false,
      playerRemoved: false,
      playersAdded: false,
      playerMadeAdmin: false,
      showPlayerOptions: false
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._renderGroupInfo = this._renderGroupInfo.bind(this);
    this._renderPlayers = this._renderPlayers.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._renderRowFriend = this._renderRowFriend.bind(this);
    this._delete = this._delete.bind(this);
    this._exit = this._exit.bind(this);
    this._renderDeleteGroupConfirmationModal = this._renderDeleteGroupConfirmationModal.bind(this);
    this._renderExitGroupConfirmationModal = this._renderExitGroupConfirmationModal.bind(this);
    this._confirmDeleteGroup = this._confirmDeleteGroup.bind(this);
    this._confirmExitGroup = this._confirmExitGroup.bind(this);
    this._cancelDeleteGroup = this._cancelDeleteGroup.bind(this);
    this._cancelExitGroup = this._cancelExitGroup.bind(this);
    this._selectingFriendsBack = this._selectingFriendsBack.bind(this);
    this._selectingFriendsConfirm = this._selectingFriendsConfirm.bind(this);
    this._selectFriends = this._selectFriends.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._renderPlayerOptions = this._renderPlayerOptions.bind(this);
    this._makeAdminPlayer = this._makeAdminPlayer.bind(this);
    this._removePlayer = this._removePlayer.bind(this);
    this._confirmRemovePlayer = this._confirmRemovePlayer.bind(this);
    this._confirmMakeAdminPlayer = this._confirmMakeAdminPlayer.bind(this);
    this._renderRemovePlayerConfirmationModal = this._renderRemovePlayerConfirmationModal.bind(this);
    this._renderMakeAdminPlayerConfirmationModal = this._renderMakeAdminPlayerConfirmationModal.bind(this);
    this._cancelRemovePlayer = this._cancelRemovePlayer.bind(this);
    this._cancelMakeAdminPlayer = this._cancelMakeAdminPlayer.bind(this);
  }

  componentDidMount() {
    GroupStore.addChangeListener(this._onStoreChange);
    GroupActions.loadGroup(this.props.groupId);
    BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onStoreChange);
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoading()}
        {this._renderError(this.state.errorLoadingGroup)}
        {this._renderError(this.state.errorDeletingGroup)}
        {this._renderError(this.state.errorExitingGroup)}
        {this._renderError(this.state.errorAddingPlayers)}
        {this._renderError(this.state.errorRemovingPlayer)}
        {this._renderError(this.state.errorMakingAdminPlayer)}
        {this._renderGroupInfo()}
        <View style={styles.options}>
          <TouchableOpacity style={[styles.option, { backgroundColor: 'blue' }]} onPress={this._selectFriends}>
            <Text style={styles.text}>{'Agegar amigos'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { backgroundColor: 'green' }]} onPress={this._exit}>
            <Text style={styles.text}>Salir del Grupo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { backgroundColor: 'red' }]} onPress={this._delete}>
            <Text style={styles.text}>Eliminar Grupo</Text>
          </TouchableOpacity>
        </View>
        {this._renderDeleteGroupConfirmationModal()}
        {this._renderExitGroupConfirmationModal()}
        {this._renderRemovePlayerConfirmationModal()}
        {this._renderMakeAdminPlayerConfirmationModal()}
        {this._renderPlayerOptions()}
      </View>
    );
  }

  _handleBack() {
    let avoidBack = false;
    this.state.group.players.forEach((p) => {
      if (p.isSelected) {
        p.isSelected = false;
        avoidBack = true;
        this.setState({
          dsFriends: ds.cloneWithRows(this.state.group.players),
          showPlayerOptions: false
        });
      }
    });

    return avoidBack;
  }

  _onStoreChange() {
    this.setState({
      isLoadingGroup: GroupStore.isLoadingGroup(),
      isDeletingGroup: GroupStore.isDeletingGroup(),
      isExitingGroup: GroupStore.isExitingGroup(),
      isRemovingPlayer: GroupStore.isRemovingPlayer(),
      isMakingAdminPlayer: GroupStore.isMakingAdminPlayer(),
      errorLoadingGroup: GroupStore.getErrorLoadingGroup(),
      errorDeletingGroup: GroupStore.getErrorDeletingGroup(),
      errorExitingGroup: GroupStore.getErrorExitingGroup(),
      errorRemovingPlayer: GroupStore.getErrorRemovingPlayer(),
      errorMakingAdminPlayer: GroupStore.getErrorMakingAdminPlayer(),
      group: GroupStore.getGroup(),
      editGroup: GroupStore.editGroup(),
      deleteGroup: GroupStore.deleteGroup(),
      removePlayer: GroupStore.removePlayer(),
      makeAdminPlayer: GroupStore.makeAdminPlayer(),
      exitGroup: GroupStore.exitGroup(),
      groupDeleted: GroupStore.groupDeleted(),
      groupExited: GroupStore.groupExited(),
      playerRemoved: GroupStore.playerRemoved(),
      playerMadeAdmin: GroupStore.playerMadeAdmin(),
      isAddingFriends: GroupStore.isAddingPlayers(),
      playersAdded: GroupStore.playersAdded()
    }, () => {
      if (GroupStore.backPressed()) {
        if (!this._handleBack())
          NavigationActions.back();
      } else {
        if (this.state.group)
          this.setState({ dsFriends: ds.cloneWithRows(this.state.group.players) });

        if (this.state.editGroup) {
          let groupToEdit = GroupStore.getGroupToEdit();
          GroupActions.editShown();
          NavigationActions.addRoute({
            id: RouteConstants.ROUTE_EDIT_GROUP,
            data: groupToEdit
          });
        } else if (this.state.groupDeleted) {
          this.setState({ errorDeletingGroup: 'Grupo eliminado.' }, () => {
            setTimeout(() => {
              GroupActions.resetGroupDetail();
              NavigationActions.back();
            }, 1500);
          });
        } else if (this.state.groupExited) {
          this.setState({ errorExitingGroup: 'Has salido del grupo.' }, () => {
            setTimeout(() => {
              GroupActions.resetGroupDetail();
              NavigationActions.back();
            }, 1500);
          });
        } else if (this.state.playersAdded) {
          this.setState({ errorAddingPlayers: 'Amigos agregados.' }, () => {
            GroupActions.resetAddPlayers();
            setTimeout(() => {
              this.setState({ errorAddingPlayers: null });
            }, 1500);
          });
        } else if (this.state.playerRemoved) {
          this.setState({ errorRemovingPlayer: 'Amigo eliminado.', showPlayerOptions: false }, () => {
            GroupActions.resetRemovePlayer();
            setTimeout(() => {
              this.setState({ errorRemovingPlayer: null });
            }, 1500);
          });
        } else if (this.state.playerMadeAdmin) {
          this.setState({ errorMakingPlayerAdmin: 'Amigo admin.', showPlayerOptions: false }, () => {
            GroupActions.resetMakePlayerAdmin();
            setTimeout(() => {
              this.setState({ errorMakingPlayerAdmin: null });
            }, 1500);
          });
        }
      }
    });
  }

  _renderLoading() {
    if (this.state.isAddingFriends || this.state.isLoadingGroup || this.state.isDeletingGroup || this.state.isExitingGroup) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderDeleteGroupConfirmationModal() {
    if (this.state.deleteGroup) {
      return (
        <ModalMessage
          text={'Eliminar grupo ' + this.state.group.description}
          confirm={this._confirmDeleteGroup}
          cancel={this._cancelDeleteGroup}
        />
      )
    }

    return null;
  }

  _renderExitGroupConfirmationModal() {
    if (this.state.exitGroup) {
      return (
        <ModalMessage
          text={'Salir del grupo ' + this.state.group.description}
          confirm={this._confirmExitGroup}
          cancel={this._cancelExitGroup}
        />
      )
    }

    return null;
  }

  _renderRemovePlayerConfirmationModal() {
    if (this.state.removePlayer) {
      return (
        <ModalMessage
          text={'Eliminar amigo del grupo ' + this.state.group.description}
          confirm={this._confirmRemovePlayer}
          cancel={this._cancelRemovePlayer}
        />
      )
    }

    return null;
  }

  _renderMakeAdminPlayerConfirmationModal() {
    if (this.state.makeAdminPlayer) {
      return (
        <ModalMessage
          text={'Hacer amigo admin del grupo ' + this.state.group.description}
          confirm={this._confirmMakeAdminPlayer}
          cancel={this._cancelMakeAdminPlayer}
        />
      )
    }

    return null;
  }

  _renderGroupInfo() {
    if (this.state.group) {
      return (
        <View style={styles.container}>
          {this._renderPlayers()}
        </View>
      )
    }

    return null;
  }

  _renderPlayers() {
    if (this.state.group.players.length)
      return (
        <ListView
          dataSource={this.state.dsFriends}
          renderRow={this._renderRowFriend}
          style={styles.listView}
          enableEmptySections={true}
        />
      )

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

  _renderPlayerOptions() {
    return this.state.showPlayerOptions ?
      (
        <View style={styles.playerOptions}>
          <TouchableOpacity style={styles.playerOptionsButton} onPress={this._makeAdminPlayer}>
            <Text style={styles.playerOptionsText}>{'Admin'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playerOptionsButton} onPress={this._removePlayer}>
            <Text style={styles.playerOptionsText}>{'Remove'}</Text>
          </TouchableOpacity>
        </View>
      )
      :
      null;
  }

  _renderRowFriend(rowData) {
    try {
      return (
        <TouchableOpacity
          key={rowData._id}
          delayLongPress={400}
          onLongPress={() => this._onLongPress(rowData._id)}
          style={[styles.playerRow, { backgroundColor: rowData.isSelected ? 'rgb(0, 155, 0)' : 'rgb(155, 155, 155)' }]} >
          <View style={styles.dataRowLeft}>
            {this._renderPhoto(rowData.photo)}
          </View>
          <View style={styles.dataRowRight}>
            {this._renderInfo(rowData)}
          </View>
        </TouchableOpacity>
      );
    } catch (error) {
      return null;
    }
  }

  _renderPhoto(photo) {
    try {
      if (photo)
        return (
          <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
        );

      return (
        <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
      );
    } catch (error) {
      return null;
    }
  }

  _renderInfo(info) {
    try {
      let ret = [];
      if (info.firstName && info.lastName) {
        ret.push(<Text key={1} style={{ fontSize: 20 }}>{info.firstName + ' ' + info.lastName}</Text>);
        ret.push(<Text key={2} style={{ fontSize: 16, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
        ret.push(<Text key={3} style={{ fontSize: 16, textAlign: 'left' }}>{!info.phone ? '' : info.phone}</Text>);
      }
      else {
        ret.push(<Text key={1} style={{ fontSize: 20, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
      }

      return (
        <View>
          {ret}
        </View>
      );
    } catch (error) {
      return null;
    }
  }

  _delete() {
    GroupActions.delete();
  }

  _exit() {
    GroupActions.exit();
  }

  _confirmDeleteGroup() {
    GroupActions.deleteConfirmed(this.props.groupId);
  }

  _confirmExitGroup() {
    GroupActions.exitConfirmed(this.props.groupId);
  }

  _cancelDeleteGroup() {
    GroupActions.cancelDeleteGroup();
  }

  _cancelExitGroup() {
    GroupActions.cancelExitGroup();
  }

  _selectFriends() {
    GroupActions.selectFriendsToAdd(this._selectingFriendsBack, this._selectingFriendsConfirm);
  }

  _selectingFriendsBack() {
    NavigationActions.back();
  }

  _selectingFriendsConfirm(friendList) {
    NavigationActions.back();
    GroupActions.addPlayers(this.props.groupId, friendList);
  }

  _onLongPress(id) {
    this.state.group.players.forEach((p) => {
      p.isSelected = p._id === id;
    });

    this.setState({
      dsFriends: ds.cloneWithRows(this.state.group.players),
      showPlayerOptions: true
    });
  }

  _removePlayer() {
    GroupActions.removePlayer();
  }

  _makeAdminPlayer() {
    GroupActions.makePlayerAdmin();
  }

  _confirmRemovePlayer() {
    let player = this.state.group.players.find((p) => {
      return p.isSelected === true;
    });
    GroupActions.removePlayerConfirmed(this.props.groupId, player._id);
  }

  _cancelRemovePlayer() {
    GroupActions.cancelRemovePlayer();
  }

  _confirmMakeAdminPlayer() {
    let player = this.state.group.players.find((p) => {
      return p.isSelected === true;
    });
    GroupActions.makeAdminPlayerConfirmed(this.props.groupId, player._id);
  }

  _cancelMakeAdminPlayer() {
    GroupActions.cancelMakeAdminPlayer();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignItems: 'center'
  },
  option: {
    height: 40,
    marginTop: 10
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  listView: {
    flex: 1,
    borderColor: 'grey',
    width: Dimensions.get('window').width * 0.9,
  },
  dataRowLeft: {
    width: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataRowRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  friendPhoto: {
    width: 60,
    height: 60
  },
  options: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    marginLeft: Dimensions.get('window').width * 0.05,
    bottom: Dimensions.get('window').width * 0.025,
  },
  playerRow: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    borderRadius: 5
  },
  playerOptions: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    backgroundColor: '#009900',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    padding: 20
  },
  playerOptionsButton: {
    width: Dimensions.get('window').width * 0.2,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff',
  },
  playerOptionsText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
