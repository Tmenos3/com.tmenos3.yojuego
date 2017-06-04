import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import NewGroupActions from '../../actions/NewGroupActions';
import NavigationActions from '../../actions/NavigationActions';


export default class NewGroupHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { NewGroupActions.confirm(); }} style={styles.menuButton}>
          <Text style={styles.menuText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { NavigationActions.back(); }} style={styles.menuButton}>
          <Text style={styles.menuText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009900',
    height: 60,
    flexDirection: 'row-reverse',
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
  }
});