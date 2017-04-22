import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import AccountActions from '../../actions/AccountActions';
import Styles from '../../constants/Styles';
import NavigationActions from '../../actions/NavigationActions';

export default class AccountHeader extends Component {
  constructor(props) {
    super(props);

    this._confirm = this._confirm.bind(this);
    this._back = this._back.bind(this);
  }

  render() {
    return (
      <View style={[Styles.HEADER_STYLE, styles.container]}>
        <TouchableOpacity onPress={this._confirm} style={styles.menuButton}>
          <Text style={styles.menuText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._back} style={styles.menuButton}>
          <Text style={styles.menuText}>Atras</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _confirm() {
    AccountActions.confirmSave();
  }

  _back() {
    AccountActions.back();
    NavigationActions.back();
  }
}

const styles = StyleSheet.create({
  container: {
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