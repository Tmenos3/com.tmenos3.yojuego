import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import CreateMatchActions from '../../actions/CreateMatchActions';
import NavigationActions from '../../actions/NavigationActions';


export default class CreateMatchHeader extends Component {
  constructor(props) {
    super(props);

    this._confirm = this._confirm.bind(this);
    this._back = this._back.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._confirm} style={styles.menuButton}>
          <Text style={styles.menuText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._back} style={styles.menuButton}>
          <Text style={styles.menuText}>Atras</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _confirm() {
    CreateMatchActions.confirm();
  }

  _back() {
    NavigationActions.back();
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