import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import Body from './Body';
import Header from './Header';
import Menu from './Menu';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header player={this.props.player} />
        <Body player={this.props.player}/>
        <Menu />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  }
});