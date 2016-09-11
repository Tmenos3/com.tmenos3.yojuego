import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet} from 'react-native';
import NavigationsActions from '../actions/NavigationsActions';
import NavigationConstants from '../constants/NavigationConstants';
import RouteConstants from '../constants/RouteConstants';

class LogIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._showFacebookLogin}>
          <Text> Facebook </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> Google </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> YoJuego </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _showFacebookLogin() {
    NavigationsActions.addRoute({
      id: RouteConstants.ROUTE_FACEBOOK_LOGIN
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: 80,
    height: 20,
    backgroundColor: 'blue',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
  // text: {
  //   fontSize: 20,
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // textInput: {
  //   height: 40,
  //   color: 'black',
  //   borderColor: 'white',
  //   borderWidth: 1,
  //   backgroundColor: "white",
  // },
  // link: {
  //   fontSize: 10,
  //   color: 'blue',
  //   textAlign: 'center',
  // },
  // button: {
  //   width: 50,
  //   height: 25,
  //   backgroundColor: 'red'
  // },
  // buttonText: {
  //   height: 30,
  //   color: 'black',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   backgroundColor: "red",
  //   textAlign: 'center',
  // },
});

module.exports = LogIn;
