import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import MatchInvitationBody from './MatchInvitationBody';
import MatchInvitationHeader from './MatchInvitationHeader';

export default class MatchInvitation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MatchInvitationHeader />
        <MatchInvitationBody matchInvitation={this.props.matchInvitation}/>
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