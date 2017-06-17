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

export default class MatchDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: this.props.match,
      cancelMatch: false,
      exitMatch: false,
      isExitingMatch: false,
      isCancelingMatch: false,
      errorExitingMatch: null,
      errorCancelingMatch: null,
      matchExited: false,
      matchCanceled: false,
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
  }

  componentDidMount() {
    MatchDetailStore.addChangeListener(this._onStoreChange);
    MatchDetailActions.setMatch(this.state.match);
  }

  componentWillUnmount() {
    MatchDetailStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <Swiper showsButtons={false}>
        {this._renderDetail()}
        <ChatRoom matchId={this.state.match._id} />
        <PlayersList confirmedPlayers={this.state.match.confirmedPlayers} pendingPlayers={this.state.match.pendingPlayers} />
      </Swiper>
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
    }, () => {
      // if (GroupStore.backPressed()) {
      //   if (!this._handleBack())
      //     NavigationActions.back();
      // } else {
      // if (this.state.group)
      //   this.setState({ dsFriends: ds.cloneWithRows(this.state.group.players) });

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
      } /*else if (this.state.playersAdded) {
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
      }*/
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
});