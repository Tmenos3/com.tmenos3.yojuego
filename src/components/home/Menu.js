import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import HomeActions from '../../actions/HomeActions';
import HomeStore from '../../stores/HomeStore';

const MENU_WIDTH_CLOSED = 0;
const MENU_WIDTH_OPENED = Dimensions.get('window').width * 0.8;

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this._onStoreChange = this._onStoreChange.bind(this);
    this._back = this._back.bind(this);

    this.state = {
      menuWidth: MENU_WIDTH_CLOSED
    }
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={[styles.menuList, { width: this.state.menuWidth }]}>
        <TouchableOpacity onPress={this._back} style={styles.menuBtnBack}>
          <Text style={styles.menuBtnBackText}>Atras</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _back() {
    HomeActions.hideMenu();
  }

  _onStoreChange() {
    this.setState({ menuWidth: HomeStore.mustShowMenu() ? MENU_WIDTH_OPENED : MENU_WIDTH_CLOSED });
  }
}

const styles = StyleSheet.create({
  menuList: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    right: 0,
    backgroundColor: 'gray',
  },
  menuBtnBack: {
    width: Dimensions.get('window').width * 0.2,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff',
    marginRight: Dimensions.get('window').width * 0.05
  },
  menuBtnBackText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});