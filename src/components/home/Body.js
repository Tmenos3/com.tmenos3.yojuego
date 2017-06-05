import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import HomeActions from '../../actions/HomeActions';
import NavigationActions from '../../actions/NavigationActions';
import HomeStore from '../../stores/HomeStore';
import RouteConstants from '../../constants/RouteConstants';
import FriendsAndGroups from './FriendsAndGroups';
import HomeNotifications from './HomeNotifications';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import FullActivityIndicator from '../common/FullActivityIndicator';
import Styles from '../../constants/Styles';

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
      showAccount: false,
    };

    this._renderRow = this._renderRow.bind(this);
    this._rowPreseed = this._rowPreseed.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderDot = this._renderDot.bind(this);
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
      <Swiper style={Styles.MAIN_CONTAINER} showsButtons={false} showsPagination={true} dot={this._renderDot()}>
        <View style={Styles.MAIN_CONTAINER}>
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

        <FriendsAndGroups />
        <HomeNotifications />
      </Swiper>
    );
  }

  _newMatch() {
    HomeActions.createMatch();
  }

  _renderRow(rowData) {
    return (
      <View>
        <TouchableOpacity style={styles.dataRow} onPress={() => this._rowPreseed(rowData)}>
          <View style={styles.dataRowLeft}>
            <Text style={{ fontSize: 26 }}>{moment(rowData.date, 'YYYY-MM-DDT00:00:00Z').format("DD/MM")}</Text>
            <Text style={{ fontSize: 13 }}>{rowData.fromTime + ' - ' + rowData.toTime}</Text>
          </View>
          <View style={styles.dataRowRight}>
            <Text style={{ fontSize: 20 }}>{rowData.title}</Text>
            <Text style={{ fontSize: 20 }}>{'Lugar: ' + rowData.location}</Text>
            <Text style={{ fontSize: 20 }}>{'Jugadores: ' + rowData.confirmedPlayers.length + ' / ' + (rowData.matchType * 2)}</Text>
            {this._isConfirmed(rowData)}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _isConfirmed(match) {
    for (let i = 0; i < match.confirmedPlayers.length; i++) {
      if (match.confirmedPlayers[i]._id === this.props.player._id)
        return (
          <Text style={{ fontSize: 20, color: 'green' }}>{'Ya Confirmaste.'}</Text>
        );
    }

    return (
      <Text style={{ fontSize: 20, color: 'red' }}>{'Todavía no confirmaste.'}</Text>

    );
  }

  _rowPreseed(match) {
    HomeActions.showMatchDetail(match);
  }

  _onStoreChange() {
    this.setState({
      showCreateMatch: HomeStore.mustShowCreateMatch(),
      showMatchDetail: HomeStore.mustShowMatchDetail(),
      showAccount: HomeStore.mustShowAccount(),
      match: HomeStore.getMatch(),
      loadingMatches: HomeStore.isLoadingMatches(),
      errorLoadingMatches: HomeStore.getErrorLoadingMatches(),
      showGroup: HomeStore.showGroup()
    }, () => {
      if (this.state.showCreateMatch) {
        NavigationActions.addRoute({
          id: RouteConstants.ROUTE_CREATE_MATCH,
        });
      } else if (this.state.showMatchDetail) {
        NavigationActions.addRoute({
          id: RouteConstants.ROUTE_MATCH_DETAIL,
          data: this.state.match
        });
      } else if (this.state.showAccount) {
        NavigationActions.addRoute({
          id: RouteConstants.ROUTE_ACCOUNT,
          data: HomeStore.getPlayer()
        });
      } else if (this.state.showGroup) {
        HomeActions.groupDetailShown();
        NavigationActions.addRoute({
          id: RouteConstants.ROUTE_GROUP_DETAIL,
          data: HomeStore.getGroupId()
        });
      } else if (!this.state.loadingMatches && !this.state.errorLoadingMatches) {
        let matches = HomeStore.getMatches();
        if (matches)
          this.setState({ matches: this.state.matches.cloneWithRows(matches) });
      }
    });
  }


  _renderLoading() {
    if (this.state.loadingMatches) {
      return (<FullActivityIndicator />)
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
  button: {
    backgroundColor: Styles.MAIN_COLOR,
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 110,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 120,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  dataRowLeft: {
    width: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataRowRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
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