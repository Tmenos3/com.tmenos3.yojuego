import React, { Component } from 'react';
import {
  View
} from 'react-native';
import AccountBody from './AccountBody';
import AccountHeader from './AccountHeader';
import Styles from '../../constants/Styles';

export default class Account extends Component {
  render() {
    return (
      <View style={Styles.MAIN_CONTAINER}>
        <AccountHeader />
        <AccountBody player={this.props.player} />
      </View>
    );
  }
}