import React, { Component } from 'react';
import {
  View
} from 'react-native';
import MatchDetailBody from './MatchDetailBody';
import MatchDetailHeader from './MatchDetailHeader';
import Styles from '../../constants/Styles';

export default class MatchDetail extends Component {
  render() {
    return (
      <View style={Styles.MAIN_CONTAINER}>
        <MatchDetailHeader match={this.props.match}/>
        <MatchDetailBody match={this.props.match}/>
      </View>
    );
  }
}