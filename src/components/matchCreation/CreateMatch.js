import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import DateTimePanel from './DateTimePanel';
import NavigationActions from '../../actions/NavigationActions';
import Panel from './CalendarPanel';
import RouteConstants from '../../constants/RouteConstants';

export default class CreateMatch extends Component {
  constructor(props) {
    super(props);

    this._onFieldSearchPress = this._onFieldSearchPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topMenu}>
            <TouchableHighlight>
              <Text style={styles.close} >
                {'X'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={styles.save} >
                {'Invitar Jugadores'}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.titleContainer} >
            <TextInput placeholder={'título'} style={styles.title} />
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.dateContainer}>
            <ScrollView style={styles.date}>
              <DateTimePanel />
            </ScrollView>
            <View style={styles.weather}>
            </View>
          </View>
          <TouchableHighlight style={styles.searchStadiumContainer} onPress={this._onFieldSearchPress}>
            <Text style={styles.searchStadium}>
              {'buscar cancha...'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _onFieldSearchPress() {
    NavigationActions.addRoute({
      id: RouteConstants.ROUTE_FIELD_SEARCH,
      data: {
        title: this.state.title,
        date: this.state.date
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 80,
    backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 7
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  close: {
    fontSize: 15,
    color: 'white'
  },
  save: {
    fontSize: 15,
    color: 'white'
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#f4f7f9',
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    paddingHorizontal: 10,
    height: 40,
  },
  title: {
    flex: 1,
    color: 'white'
  },
  dateContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  date: {
    marginBottom: 10
  },
  weather: {
    backgroundColor: 'green',
    height: 200,
    marginBottom: 10
  },
  searchStadiumContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  searchStadium: {
  }
});