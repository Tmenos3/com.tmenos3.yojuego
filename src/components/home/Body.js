import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ListView,
  Text
} from 'react-native';

class Body extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([{ date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { date: { day: '21', month: 'OCT' }, desc: 'One match.' }])
    };

    this._renderRow = this._renderRow.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          style={styles.listView}
          />
        <TouchableOpacity  style={styles.button} onPress={this._showSignUp}>
          <Text style={{ left: 13.5, bottom: 13.5, color: 'black', fontSize: 60 }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <View style={{ borderRadius: 10 }}>
        <TouchableOpacity style={styles.dataRow}>
          <View style={styles.dataRowLeft}>
            <Text style={{ fontSize: 26 }}>{rowData.date.day}</Text>
            <Text style={{ fontSize: 13 }}>{rowData.date.month}</Text>
          </View>
          <View style={styles.dataRowRight}>
            <Text style={{ fontSize: 20 }}>{rowData.desc}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  button: {
    backgroundColor: '#009900',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 20
  },
  dataRow: {
    marginTop: 6,
    marginHorizontal: 6,
    borderBottomWidth: 0.5,
    height: 60,
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
  listView: {
    flex: 1,
    borderColor: 'grey'
  }
});
module.exports = Body;
