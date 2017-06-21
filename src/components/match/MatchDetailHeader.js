import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import MatchDetailActions from '../../actions/MatchDetailActions';
import NavigationActions from '../../actions/NavigationActions';
import Styles from '../../constants/Styles';

export default class MatchDetailHeader extends Component {
  constructor(props) {
    super(props);

    this._edit = this._edit.bind(this);
    this._back = this._back.bind(this);
    this._renderDescription = this._renderDescription.bind(this);
  }

  render() {
    return (
      <View style={[Styles.HEADER_STYLE, styles.container]}>
        {this._renderDescription()}
        <View style={styles.buttons}>
          <TouchableOpacity disabled={this.props.match.status === 'CANCELED'} onPress={this._edit} style={[styles.menuButton, { backgroundColor: this.props.match.status === 'CANCELED' ? 'gray' : '#33adff' }]}>
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._back} style={styles.menuButton}>
            <Text style={styles.menuText}>Atras</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderDescription() {
    if (this.props.match)
      return (<Text style={styles.matchName}>{'Partido: ' + this.props.match.title}</Text>);

    return null;
  }

  _edit() {
    MatchDetailActions.edit();
  }

  _back() {
    MatchDetailActions.back();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009900',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuButton: {
    width: Dimensions.get('window').width * 0.2,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff',
    marginRight: Dimensions.get('window').width * 0.05
  },
  menuText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  matchName: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10
  },
  buttons: {
    flexDirection: 'row',
  }
});