import React, { Component } from 'react';
import {
  View,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  BackAndroid
} from 'react-native';
import Styles from '../../constants/Styles';
import FriendRow from '../common/FriendRow';
import ModalMessage from '../common/ModalMessage';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class PlayersList extends Component {
  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
    this._renderPlayerOptions = this._renderPlayerOptions.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._handleRemove = this._handleRemove.bind(this);

    let confirmed = this.props.confirmedPlayers.map((player) => {
      return {
        type: 'CONFIRMED',
        isSelected: false,
        ...player
      }
    });

    let pending = this.props.pendingPlayers.map((player) => {
      return {
        type: 'PENDING',
        isSelected: false,
        ...player
      }
    });

    this.state = {
      dsPlayers: ds.cloneWithRows(confirmed.concat(pending)),
      players: confirmed.concat(pending),
      showPlayerOptions: this.props.showPlayerOptions
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.confirmedPlayers.length !== this.props.confirmedPlayers.length || nextProps.pendingPlayers.length !== this.props.pendingPlayers.length) {
      let confirmed = nextProps.confirmedPlayers.map((player) => {
        return {
          type: 'CONFIRMED',
          isSelected: false,
          ...player
        }
      });

      let pending = nextProps.pendingPlayers.map((player) => {
        return {
          type: 'PENDING',
          isSelected: false,
          ...player
        }
      });

      this.setState({
        dsPlayers: ds.cloneWithRows(confirmed.concat(pending)),
        players: confirmed.concat(pending),
        showPlayerOptions: nextProps.showPlayerOptions
      });
    }
  }

  render() {
    return (
      <View style={[Styles.MAIN_CONTAINER, { flexDirection: 'column' }]}>
        <ListView
          dataSource={this.state.dsPlayers}
          renderRow={this._renderRow}
          style={styles.confirmedView}
          enableEmptySections={true}
        />
        <TouchableOpacity style={styles.inviteBtn} onPress={this.props.invite}>
          <Text style={styles.buttonText}>Invitar</Text>
        </TouchableOpacity>
        {this._renderPlayerOptions()}
      </View>
    );
  }

  _renderRow(rowData) {
    let backgroundColor = rowData.type === 'CONFIRMED' ? 'rgba(0, 200, 0, 0.5)' : 'white';
    backgroundColor = rowData.isSelected ? 'rgb(0, 155, 0)' : backgroundColor;
    return (
      <TouchableOpacity
        key={rowData._id}
        delayLongPress={400}
        onLongPress={() => this._onLongPress(rowData._id)}>
        <FriendRow friend={rowData} backgroundColor={backgroundColor} />
      </TouchableOpacity>
    );
  }

  _onLongPress(id) {
    this.state.players.forEach((p) => {
      p.isSelected = p._id === id;
    });

    this.setState({
      dsPlayers: ds.cloneWithRows(this.state.players),
      showPlayerOptions: true
    });
  }

  _renderPlayerOptions() {
    return this.state.showPlayerOptions ?
      (
        <View style={styles.playerOptions}>
          <TouchableOpacity style={styles.playerOptionsButton} onPress={this._handleRemove}>
            <Text style={styles.playerOptionsText}>{'Remove'}</Text>
          </TouchableOpacity>
        </View>
      )
      :
      null;
  }

  _handleBack() {
    let avoidBack = false;
    this.state.players.forEach((p) => {
      if (p.isSelected) {
        p.isSelected = false;
        avoidBack = true;
        this.setState({
          dsFriends: ds.cloneWithRows(this.state.players),
          showPlayerOptions: false
        });
      }
    });

    if (!avoidBack)
      this.props.onBackPressed();

    return true;
  }

  _handleRemove() {
    let player = this.state.players.find((p) => {
      return p.isSelected;
    });

    this.props.removePlayer(player);
  }
}

const styles = StyleSheet.create({
  confirmedView: {
    flex: 1,
    flexDirection: 'column',
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
  playerOptions: {
    position: 'absolute',
    top: Dimensions.get('window').height - 140,
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