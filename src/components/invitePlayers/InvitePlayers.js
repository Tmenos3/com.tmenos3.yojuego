import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class InvitePlayers extends Component {
  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderPlayers = this._renderPlayers.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._rowPreseed = this._rowPreseed.bind(this);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        'John',
        'Joel',
        'James',
        'Jimmy',
        'Jackson',
        'Jillian',
        'Julie',
        'Devin',
        '12John',
        '12Joel',
        '12James',
        '12Jimmy',
        '12Jackson',
        '12Jillian',
        '12Julie',
        '12Devin'
      ])
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <TextInput placeholder={'Jugador'} style={styles.typePlayer} />
        {this._renderPlayers()}
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <Text >
          {'Invitar Jugadores'}
        </Text>
      </View>
    );
  }

  _renderPlayers() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.listView}
        />
    );
  }

  _renderRow(rowData) {
    return (
      <View style={{ borderRadius: 10 }}>
        <TouchableOpacity style={styles.dataRow} onPress={() => this._rowPreseed(rowData.id)}>
          <View style={styles.dataRowLeft}>
            <Text style={styles.text}>{rowData}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _rowPreseed(idPalyer) {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 70,
    backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7
  },
  typePlayer: {
    height: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7
  },
  listView: {
    flex: 1,
    borderColor: 'grey'
  },
  dataRow: {
    marginTop: 6,
    marginHorizontal: 6,
    borderBottomWidth: 0.5,
    height: 40,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    borderRadius: 5
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
  text: {
    flex: 1,
  }
});