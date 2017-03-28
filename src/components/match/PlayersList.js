import React, { Component } from 'react';
import {
  View,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import Styles from '../../constants/Styles';
import FriendRow from '../common/FriendRow';

export default class PlayersList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._renderRow = this._renderRow.bind(this);

    let confirmed = this.props.confirmedPlayers.map((player) => {
      return {
        type: 'CONFIRMED',
        ...player
      }
    });

    let pending = this.props.pendingPlayers.map((player) => {
      return {
        type: 'PENDING',
        ...player
      }
    });

    this.state = {
      players: ds.cloneWithRows(confirmed.concat(pending)),
    }
  }

  render() {
    return (
      <View style={[Styles.MAIN_CONTAINER, { flexDirection: 'column' }]}>
        <ListView
          dataSource={this.state.players}
          renderRow={this._renderRow}
          style={styles.confirmedView}
          enableEmptySections={true}
        />
        <TouchableOpacity style={styles.inviteBtn} onPress={this._newMatch}>
          <Text style={styles.buttonText}>Invitar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderRow(rowData) {
    let backgroundColor = rowData.type === 'CONFIRMED' ? 'rgba(0, 200, 0, 0.5)' : 'white';
    return (
      <Friend friend={rowData} backgroundColor={backgroundColor} />
    );
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
  }
});