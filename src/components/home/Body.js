import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import HomeActions from '../../actions/HomeActions';
import NavigationActions from '../../actions/NavigationActions';
import HomeStore from '../../stores/HomeStore';
import RouteConstants from '../../constants/RouteConstants';
import moment from 'moment';
import Swiper from 'react-native-swiper';

export default class Body extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      matches: ds.cloneWithRows([]),
      loadingMatches: false,
      errorLoadingMatches: null,
      showCreateMatch: false,
      showMatchDetail: false,
      match: null
    };

    this._renderRow = this._renderRow.bind(this);
    this._rowPreseed = this._rowPreseed.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderDot = this._renderDot.bind(this);
    // this._showMatchDetail = this._showMatchDetail.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._newMatch = this._newMatch.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onStoreChange);
    HomeActions.loadPlayerMatches();
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <Swiper style={styles.container} showsButtons={false} showsPagination={true} dot={this._renderDot()}>
        <View style={styles.container}>
          {this._renderLoading()}
          <ListView
            dataSource={this.state.matches}
            renderRow={this._renderRow}
            style={styles.listView}
            enableEmptySections={true}
            />
          <TouchableOpacity style={styles.button} onPress={this._newMatch}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Amigos y grupos</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Notificaciones</Text>
        </View>
      </Swiper>
    );
  }

  _newMatch() {
    HomeActions.createMatch();
  }

  _renderRow(rowData) {
    return (
      <View style={{ borderRadius: 10 }}>
        <TouchableOpacity style={styles.dataRow} onPress={() => this._rowPreseed(rowData)}>
          <View style={styles.dataRowLeft}>
            <Text style={{ fontSize: 26 }}>{moment(rowData.date).format("DD")}</Text>
            <Text style={{ fontSize: 13 }}>{moment(rowData.date).format("MM")}</Text>
          </View>
          <View style={styles.dataRowRight}>
            <Text style={{ fontSize: 20 }}>{rowData.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _rowPreseed(match) {
    HomeActions.showMatchDetail(match);
  }

  _onStoreChange() {
    this.setState({
      showCreateMatch: HomeStore.mustShowCreateMatch(),
      showMatchDetail: HomeStore.mustShowMatchDetail(),
      match: HomeStore.getMatch(),
      loadingMatches: HomeStore.isLoadingMatches(),
      errorLoadingMatches: HomeStore.getErrorLoadingMatches(),
    }, () => {
      if (this.state.showCreateMatch) {
        NavigationActions.replaceRoute({
          id: RouteConstants.ROUTE_CREATE_MATCH,
        });
      } else if (this.state.showMatchDetail) {
        NavigationActions.replaceRoute({
          id: RouteConstants.ROUTE_MATCH_DETAIL,
          payload: this.state.match
        });
      } else if (!this.state.loadingMatches && !this.state.errorLoadingMatches) {
        this.setState({ matches: this.state.matches.cloneWithRows(HomeStore.getMatches()) });
      }
    });
  }

  // _showMatchDetail(match) {
  //   NavigationActions.replaceRoute({
  //     id: RouteConstants.CREATE_NEW_MATCH,
  //     payload: match
  //   });
  // }

  _renderLoading() {
    if (this.state.loadingMatches) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderDot() {
    return (
      <View style={{
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }}
        />
    );
  }
}

const styles = StyleSheet.create({
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  }
});