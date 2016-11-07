import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ListView,
  Text
} from 'react-native';
import MatchActions from '../../actions/MatchActions';
import MatchStore from '../../stores/MatchStore';
import RouteConstants from '../../constants/RouteConstants';

class Body extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        { id: 1, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { id: 2, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { id: 3, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { id: 4, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { id: 5, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { id: 6, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { id: 7, date: { day: '21', month: 'OCT' }, desc: 'One match.' },
        { id: 8, date: { day: '21', month: 'OCT' }, desc: 'One match.' }]),
      loadingMatch: false
    };

    this._renderRow = this._renderRow.bind(this);
    this._rowPreseed = this._rowPreseed.bind(this);
    this._onMatchChange = this._onMatchChange.bind(this);
    this._showMatchDetail = this._showMatchDetail.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
  }

  componentDidMount() {
    MatchStore.addChangeListener(this._onMatchChange);
  }

  componentWillUnmount() {
    MatchStore.removeChangeListener(this._onMatchChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          style={styles.listView}
          />
        <TouchableOpacity style={styles.button} onPress={this._showSignUp}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        {this._renderLoading()}
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <View style={{ borderRadius: 10 }}>
        <TouchableOpacity style={styles.dataRow} onPress={() => this._rowPreseed(rowData.id)}>
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

  _rowPreseed(idMatch) {
    MatchActions.getMatchDetail(idMatch);
  }

  _onMatchChange() {
    if (MatchStore.loadingMatchDetail()) {
      this.setState({ loadingMatch: true });
    } else {
      let match = MatchStore.getMatch();
      if (match != null) {
        this._showMatchDetail(match);
      } else {
        this.setState({ error: MatchStore.getError() });
      }
    }
  }

  _showMatchDetail(match) {
    NavigationsActions.replaceRoute({
      id: RouteConstants.MATCH_DETAIL,
      payload: match
    });
  }

  _renderLoading() {
    if (this.state.loadingMatch) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }
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
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonText: {
    color: 'black',
    fontSize: 45,
    backgroundColor: 'transparent',
    flex: 1
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
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  }
});
module.exports = Body;
