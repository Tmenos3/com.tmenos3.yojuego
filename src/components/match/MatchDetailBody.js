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
import MatchDetailActions from '../../actions/MatchDetailActions';
import PlayersList from './PlayersList';
import ChatRoom from './ChatRoom';
import Swiper from 'react-native-swiper';
import Styles from '../../constants/Styles'

export default class MatchDetailBody extends Component {
  constructor(props) {
    super(props);

    const confirmedPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const pendingPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this._renderDetail = this._renderDetail.bind(this);

    this.state = {
      match: this.props.match,
      confirmedPlayers: confirmedPlayers.cloneWithRows(['Juacito', 'Mengano', 'Tu Vieja', 'Pelado', 'Lechon']),
      pendingPlayers: pendingPlayers.cloneWithRows(['Juacito', 'Mengano', 'Tu Vieja', 'Pelado', 'Lechon', 'sarasa', 'wanda nada', 'guaresnei', 'oldenait'])
    }
  }

  render() {
    return (
      <Swiper style={Styles.MAIN_CONTAINER} showsButtons={false}>
        {this._renderDetail()}
        <ChatRoom matchId={this.props.match._id}/>
        <PlayersList confirmedPlayers={this.props.match.confirmedPlayers} pendingPlayers={this.props.match.pendingPlayers} />
      </Swiper>
    );
  }

  _renderDetail() {
    let confirmados = this.props.match.confirmedPlayers.length;
    let needed = this.props.match.matchType * 2;
    let total = this.props.match.confirmedPlayers.length + this.props.match.pendingPlayers.length;
    let pending = this.props.match.pendingPlayers.length;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.match.title}</Text>
        <Text style={styles.text}>{'Día: ' + this.props.match.date}</Text>
        <Text style={styles.text}>{'Hora: ' + this.props.match.fromTime + ' - ' + this.props.match.toTime}</Text>
        <Text style={styles.text}>{'Tipo: ' + this._getMatchType(this.props.match.matchType)}</Text>
        <Text style={styles.text}>{'Confirmados: ' + confirmados + ' / ' + needed}</Text>
        <Text style={styles.text}>{'Pendientes: ' + pending + ' / ' + total}</Text>
        <TouchableOpacity style={styles.club}>
          <Text style={styles.text}>{'Cancha: ' + this.props.match.location}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _getMatchType(matchType) {
    return matchType + ' vs ' + matchType;
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
  }
});