import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
// import MatchActions from '../../actions/MatchActions';
// import MatchStore from '../../stores/MatchStore';
// import RouteConstants from '../../constants/RouteConstants';

class MatchDetailHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 10,
      month: 10,
      desc: 'demo match',
      match: props.match
    }
  }

  componentDidMount() {
    // MatchStore.addChangeListener(this._onMatchChange);
  }

  componentWillUnmount() {
    // MatchStore.removeChangeListener(this._onMatchChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.options}>
          <Image style={styles.menuImage} source={require('../../statics/menu-izq.png')}></Image>
        </TouchableOpacity>
        <View style={styles.dataRowLeft}>
          <Text style={{ fontSize: 26 }}>{this.state.day}</Text>
          <Text style={{ fontSize: 13 }}>{this.state.month}</Text>
        </View>
        <View style={styles.dataRowRight}>
          <Text style={{ fontSize: 20 }}>{this.state.desc}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#009900',
    height: 60,
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  options: {
    width: 60,
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
  menuImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 7,
    bottom: 7
  },
});

module.exports = MatchDetailHeader;
