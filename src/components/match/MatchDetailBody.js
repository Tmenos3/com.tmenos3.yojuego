import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ListView,
  Picker,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import MatchDetailActions from '../../actions/MatchDetailActions';
import MatchDetailStore from '../../stores/MatchDetailStore';
import RouteConstants from '../../constants/RouteConstants';
import PlayersList from './PlayersList';
import ChatRoom from './ChatRoom';
import Swiper from 'react-native-swiper';
import Styles from '../../constants/Styles';
import ModalMessage from '../common/ModalMessage';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class MatchDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: this.props.match,
      dsComments: ds.cloneWithRows(this.props.match.comments),
      cancelMatch: false,
      exitMatch: false,
      isExitingMatch: false,
      isCancelingMatch: false,
      errorExitingMatch: null,
      errorCancelingMatch: null,
      matchExited: false,
      matchCanceled: false,
      matchSaved: false,
      playerToRemove: null,
      isRemovingPlayer: false,
      errorRemovingPlayer: null,
      playerRemoved: false,
      showPlayerOptions: false,
      commentToSend: ''
    }

    this._renderDetail = this._renderDetail.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._cancelMatch = this._cancelMatch.bind(this);
    this._exitMatch = this._exitMatch.bind(this);
    this._renderCancelMatchConfirmationModal = this._renderCancelMatchConfirmationModal.bind(this);
    this._renderExitMatchConfirmationModal = this._renderExitMatchConfirmationModal.bind(this);
    this._cancelCancelMatch = this._cancelCancelMatch.bind(this);
    this._cancelExitMatch = this._cancelExitMatch.bind(this);
    this._confirmCancelMatch = this._confirmCancelMatch.bind(this);
    this._confirmExitMatch = this._confirmExitMatch.bind(this);
    this._resetAndBack = this._resetAndBack.bind(this);
    this._invite = this._invite.bind(this);
    this._selectingFriendsBack = this._selectingFriendsBack.bind(this);
    this._selectingFriendsConfirm = this._selectingFriendsConfirm.bind(this);
    this._renderRemovePlayerConfirmationModal = this._renderRemovePlayerConfirmationModal.bind(this);
    this._confirmRemovePlayer = this._confirmRemovePlayer.bind(this);
    this._cancelRemovePlayer = this._cancelRemovePlayer.bind(this);
    this._removePlayer = this._removePlayer.bind(this);
    this._playerListBack = this._playerListBack.bind(this);
    this._sendComment = this._sendComment.bind(this);
    this._renderChat = this._renderChat.bind(this);
    this._renderRowComment = this._renderRowComment.bind(this);
    this._onCommentTextChanged = this._onCommentTextChanged.bind(this);
  }

  componentDidMount() {
    MatchDetailStore.addChangeListener(this._onStoreChange);
    MatchDetailActions.setMatch(this.state.match);
    MatchDetailActions.loadFriendsAndGroups();
  }

  componentWillUnmount() {
    MatchDetailStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View>
        <Swiper showsButtons={false}>
          {this._renderDetail()}
          {this._renderChat()}
          <PlayersList
            invite={this._invite}
            confirmedPlayers={this.state.match.confirmedPlayers}
            pendingPlayers={this.state.match.pendingPlayers}
            removePlayer={this._removePlayer}
            onBackPressed={this._playerListBack}
            showPlayerOptions={this.state.showPlayerOptions} />
        </Swiper>
        {this._renderRemovePlayerConfirmationModal()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      editMatch: MatchDetailStore.editMatch(),
      match: MatchDetailStore.getMatch(),
      exitMatch: MatchDetailStore.exitMatch(),
      cancelMatch: MatchDetailStore.cancelMatch(),
      isExitingMatch: MatchDetailStore.isExitingMatch(),
      isCancelingMatch: MatchDetailStore.isCancelingMatch(),
      errorExitingMatch: MatchDetailStore.getErrorExitingMatch(),
      errorCancelingMatch: MatchDetailStore.getErrorCancelingMatch(),
      matchExited: MatchDetailStore.matchExited(),
      matchCanceled: MatchDetailStore.matchCanceled(),
      isLoadingFriends: MatchDetailStore.isLoadingFriends(),
      isLoadingGroups: MatchDetailStore.isLoadingGroups(),
      errorLoadingFriends: MatchDetailStore.getErrorLoadingFriends(),
      errorLoadingGroups: MatchDetailStore.getErrorLoadingGroups(),
      matchSaved: MatchDetailStore.matchSaved(),
      removePlayer: MatchDetailStore.removePlayer(),
      isRemovingPlayer: MatchDetailStore.isRemovingPlayer(),
      playerToRemove: MatchDetailStore.playerToRemove(),
      errorRemovingPlayer: MatchDetailStore.getErrorRemovingPlayer(),
      playerRemoved: MatchDetailStore.playerRemoved(),
    }, () => {
      let b = MatchDetailStore.backPressed();
      if (b) {
        NavigationActions.back();
      } else {
        if (this.state.match)
          this.setState({ dsComments: ds.cloneWithRows(this.state.match.comments) });

        if (this.state.editMatch) {
          MatchDetailActions.editShown();
          NavigationActions.addRoute({
            id: RouteConstants.ROUTE_EDIT_MATCH,
            data: this.state.match
          });
        } else if (this.state.matchCanceled) {
          this.setState({ errorCancelingMatch: 'Partido cancelado.' }, this._resetAndBack);
        } else if (this.state.matchExited) {
          this.setState({ errorExitingMatch: 'Te bajaste del partido.' }, this._resetAndBack);
        } else if (this.state.matchSaved) {
          NavigationActions.back();
        } else if (this.state.playerRemoved) {
          this.setState({ errorRemovingPlayer: 'Amigo eliminado.', showPlayerOptions: true }, () => {
            MatchDetailActions.resetRemovePlayer();
            setTimeout(() => {
              this.setState({ errorRemovingPlayer: null, showPlayerOptions: false });
            }, 1500);
          });
        }
      }
    });
  }

  _renderChat() {
    return (
      <View style={[Styles.MAIN_CONTAINER, styles.chatContainer]}>
        <View style={styles.chat}>
          <ListView
            dataSource={this.state.dsComments}
            renderRow={this._renderRowComment}
            style={styles.confirmedView}
            enableEmptySections={true}
          />
        </View>
        <View style={styles.chatComment}>
          <TextInput
            placeholder={"Escribir..."}
            style={styles.chatInput}
            onChangeText={this._onCommentTextChanged}
            value={this.state.commentToSend}
            underlineColorAndroid={'transparent'}
          />
          <TouchableOpacity style={styles.send} onPress={this._sendComment}>
            <Text style={styles.text}>{'Enviar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _sendComment() {
    MatchDetailActions.sendComment(this.state.commentToSend, this.state.match._id);
    this.setState({ commentToSend: '' });
  }

  _renderRowComment(rowData) {
    try {
      return (
        <View
          key={rowData.id}
          style={styles.chatComment}>
          <Text>{rowData.text}</Text>
        </View>
      );
    } catch (error) {
      return null;
    }
  }

  _onCommentTextChanged(text) {
    this.setState({
      commentToSend: text
    });
  }

  _resetAndBack() {
    setTimeout(() => {
      MatchDetailActions.reset();
      NavigationActions.back();
    }, 1500);
  }

  _renderDetail() {
    let confirmados = this.state.match.confirmedPlayers.length;
    let needed = this.state.match.matchType * 2;
    let total = this.state.match.confirmedPlayers.length + this.state.match.pendingPlayers.length;
    let pending = this.state.match.pendingPlayers.length;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.state.match.title}</Text>
        <Text style={styles.text}>{'Día: ' + this.state.match.date}</Text>
        <Text style={styles.text}>{'Hora: ' + this.state.match.fromTime + ' - ' + this.state.match.toTime}</Text>
        <Text style={styles.text}>{'Tipo: ' + this._getMatchType(this.state.match.matchType)}</Text>
        <Text style={styles.text}>{'Confirmados: ' + confirmados + ' / ' + needed}</Text>
        <Text style={styles.text}>{'Pendientes: ' + pending + ' / ' + total}</Text>
        <TouchableOpacity style={styles.club}>
          <Text style={styles.text}>{'Cancha: ' + this.state.match.location}</Text>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity disabled={this.props.match.status === 'CANCELED'} style={[styles.option, { backgroundColor: this.props.match.status === 'CANCELED' ? 'gray' : 'red' }]} onPress={this._cancelMatch}>
            <Text style={styles.text}>{'C'}</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={this.props.match.status === 'CANCELED'} style={[styles.option, { backgroundColor: this.props.match.status === 'CANCELED' ? 'gray' : 'blue' }]} onPress={this._exitMatch}>
            <Text style={styles.text}>{'B'}</Text>
          </TouchableOpacity>
        </View>
        {this._renderCancelMatchConfirmationModal()}
        {this._renderExitMatchConfirmationModal()}
      </View>
    );
  }

  _getMatchType(matchType) {
    return matchType + ' vs ' + matchType;
  }

  _exitMatch() {
    MatchDetailActions.exit();
  }

  _cancelMatch() {
    MatchDetailActions.cancel();
  }

  _renderCancelMatchConfirmationModal() {
    if (this.state.cancelMatch) {
      return (
        <ModalMessage
          text={'Cancelar partido ' + this.state.match.title}
          confirm={this._confirmCancelMatch}
          cancel={this._cancelCancelMatch}
        />
      )
    }

    return null;
  }

  _renderExitMatchConfirmationModal() {
    if (this.state.exitMatch) {
      return (
        <ModalMessage
          text={'Queres bajarte del partido ' + this.state.match.title}
          confirm={this._confirmExitMatch}
          cancel={this._cancelExitMatch}
        />
      )
    }

    return null;
  }

  _confirmCancelMatch() {
    MatchDetailActions.cancelMatchConfirmed(this.state.match._id);
  }

  _cancelCancelMatch() {
    MatchDetailActions.cancelCancelMatch();
  }

  _confirmExitMatch() {
    MatchDetailActions.exitMatchConfirmed(this.state.match._id);
  }

  _cancelExitMatch() {
    MatchDetailActions.cancelExitMatch();
  }

  _invite() {
    if (!this.state.isLoadingFriends && !this.state.isLoadingGroups && !this.state.errorLoadingFriends && !this.state.errorLoadingGroups)
      NavigationActions.addRoute({
        id: RouteConstants.ROUTE_FRIEND_AND_GROUP_LIST,
        data: {
          friends: MatchDetailStore.getFriends(),
          groups: MatchDetailStore.getGroups(),
          onBack: this._selectingFriendsBack,
          onConfirm: this._selectingFriendsConfirm
        }
      });
  }

  _selectingFriendsBack() {
    NavigationActions.back();
  }

  _selectingFriendsConfirm(friendList, groupList) {
    MatchDetailActions.invite(this.state.match, friendList, groupList);
  }

  _renderRemovePlayerConfirmationModal() {
    if (this.state.removePlayer) {
      return (
        <ModalMessage
          text={'Eliminar amigo del grupo ' + this.state.playerToRemove.email}
          confirm={this._confirmRemovePlayer}
          cancel={this._cancelRemovePlayer}
        />
      )
    }

    return null;
  }

  _removePlayer(player) {
    MatchDetailActions.removePlayer(player);
  }

  _confirmRemovePlayer() {
    MatchDetailActions.removePlayerConfirmed(this.state.match._id, this.state.playerToRemove._id);
  }

  _cancelRemovePlayer() {
    MatchDetailActions.cancelRemovePlayer();
  }

  _playerListBack() {
    NavigationActions.back();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    width: Dimensions.get('window').width * 0.3,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff'
  },
  matchTitle: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    marginTop: 5
  },
  titleText: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  dateContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
    marginTop: 20
  },
  dayContainer: {
    height: 70,
    flexDirection: 'column',
    width: 70,
    backgroundColor: 'gray',
    borderRadius: 20
  },
  dayText: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  monthText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center'
  },
  dayOfWeekContainer: {
    height: 70,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'gray',
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10
  },
  timeContainer: {
    height: 70,
    flexDirection: 'column',
    width: 70,
    backgroundColor: 'gray',
    borderRadius: 20
  },
  dayOfWeekText: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  playersContainer: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10
  },
  club: {
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10,
    backgroundColor: Styles.MAIN_COLOR,
    height: 30
  },
  countText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'left',
    marginLeft: 10
  },
  teamContainer: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
  },
  confirmedView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
    marginRight: 5,
    borderRadius: 20
  },
  pendingView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'yellow',
    marginLeft: 5,
    borderRadius: 20
  },
  inviteBtn: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: 'white'
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: 'rgb(0, 200, 0)',
    position: 'absolute',
    top: Dimensions.get('window').height - 140
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 10
  },
  chatContainer: {
    alignItems: 'center'
  },
  chat: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    height: Dimensions.get('window').height * 0.71,
    marginTop: 10
  },
  chatComment: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.95,
    height: 60,
    bottom: 0,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatInput: {
    width: Dimensions.get('window').width * 0.94,
    flex: 1,
    fontSize: 20,
    color: 'black'
  },
  send: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});