import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import EditMatchActions from '../../actions/EditMatchActions';
import NavigationActions from '../../actions/NavigationActions';

export default class EditMatchHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.matchName}>{'Edit ' + this.props.match.title}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this._confirm} style={styles.menuButton}>
            <Text style={styles.menuText}>Ok</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._back} style={styles.menuButton}>
            <Text style={styles.menuText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _confirm() {
    EditMatchActions.confirm();
  }

  _back() {
    NavigationActions.back();
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