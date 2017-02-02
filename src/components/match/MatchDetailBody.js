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
import CollapsablePanel from '../CollapsablePanel';
import MatchDetailActions from '../../actions/MatchDetailActions';
// import MatchDetailStore from '../../stores/MatchDetailStore';
import Swiper from 'react-native-swiper';

export default class MatchDetailBody extends Component {
  constructor(props) {
    super(props);

    const confirmedPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const pendingPlayers = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this._renderDetail = this._renderDetail.bind(this);
    this._renderClothing = this._renderClothing.bind(this);
    this._renderTeam = this._renderTeam.bind(this);
    this._renderRow = this._renderRow.bind(this);

    this.state = {
      match: this.props.match,
      confirmedPlayers: confirmedPlayers.cloneWithRows(['Juacito', 'Mengano', 'Tu Vieja', 'Pelado', 'Lechon']),
      pendingPlayers: pendingPlayers.cloneWithRows(['Juacito', 'Mengano', 'Tu Vieja', 'Pelado', 'Lechon', 'sarasa', 'wanda nada', 'guaresnei', 'oldenait'])
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  /*
        <View style={styles.container}>
          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; } }
            automaticallyAdjustContentInsets={true}
            scrollEventThrottle={200}
            style={styles.scrollView}>
            {this._renderPlayers()}
            {this._renderStadium()}
            {this._renderComments()}
          </ScrollView>
          {this._renderLoading()}
        </View>
  */

  render() {
    return (
      <Swiper style={styles.container} showsButtons={false}>
        {this._renderDetail()}
        {this._renderClothing()}
        {this._renderTeam()}
      </Swiper>
    );
  }

  _renderDetail() {
    return (
      <View style={styles.container}>
        <View style={styles.matchTitle}>
          <Text style={styles.titleText}>Los pibes - Jueves 22hs</Text>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>22</Text>
            <Text style={styles.monthText}>Feb</Text>
          </View>
          <View style={styles.dayOfWeekContainer}>
            <Text style={styles.dayOfWeekText}>Jueves</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.dayText}>18</Text>
            <Text style={styles.monthText}>hs</Text>
          </View>
        </View>
        <View style={styles.playersContainer}>
          <View style={styles.counts}>
            <View style={styles.confirmed}>
              <Text style={styles.countText}>Confirmados 8/10</Text>
            </View>
            <View style={styles.pending}>
              <Text style={styles.countText}>Pendientes 12/20</Text>
            </View>
          </View>
          <View style={styles.status}>

          </View>
        </View>
        <View style={styles.clubContainer}>
          <Text style={styles.titleText}>Cancha</Text>
        </View>
      </View>
    );
  }

  _renderClothing() {
    return (
      <View style={styles.container}>
        <View style={styles.chat}>

        </View>
        <View style={styles.message}>

        </View>
      </View>
    );
  }

  _renderTeam() {
    return (
      <View style={styles.teamContainer}>
        <ListView
          dataSource={this.state.confirmedPlayers}
          renderRow={this._renderRow}
          style={styles.confirmedView}
          enableEmptySections={true}
          />
        <ListView
          dataSource={this.state.pendingPlayers}
          renderRow={this._renderRow}
          style={styles.pendingView}
          enableEmptySections={true}
          />
        <TouchableOpacity style={styles.inviteBtn} onPress={this._newMatch}>
          <Text style={styles.buttonText}>Invitar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <View>
        <Text style={{ fontSize: 20 }}>{rowData}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 50,
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
    height: 70,
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
  clubContainer: {
    flex: 2,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
    marginTop: 10,
    backgroundColor: 'gray',
    borderRadius: 20
  },
  counts: {
    flex: 4,
    flexDirection: 'column',
    width: Dimensions.get('window').width * 0.9,
    marginRight: 10
  },
  confirmed: {
    flex: 1,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 20
  },
  pending: {
    flex: 1,
    height: 20,
    backgroundColor: 'yellow',
    borderRadius: 20
  },
  status: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: 'red',
    borderRadius: 20
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
  chat: {
    flex: 1,
    backgroundColor: 'gray',
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 20
  },
  message: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    borderRadius: 30,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
});