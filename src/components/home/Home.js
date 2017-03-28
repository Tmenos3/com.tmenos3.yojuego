import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Body from './Body';
import Header from './Header';
import Menu from './Menu';
import Styles from '../../constants/Styles';

export default class Home extends Component {
  render() {
    return (
      <View style={Styles.MAIN_CONTAINER}>
        <Header player={this.props.player} />
        <Body player={this.props.player} />
        <Menu player={this.props.player}/>
      </View>
    );
  }
}