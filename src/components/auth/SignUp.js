import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

class SignUp extends Component {
  render() {
    return (
      <View>
        <TextInput placeholder={"mail"} style={styles.textInput}/>
        <TextInput placeholder={"password"} style={styles.textInput}/>
        <TextInput placeholder={"repeti el password"} style={styles.textInput}/>
        <TextInput placeholder={"nickname"} style={styles.textInput}/>
        <TextInput placeholder={"fecha de nacimiento"} style={styles.textInput}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    width: 100,
    height: 30,
    borderColor: 'black',
    color: 'black',
    borderWidth: 1,
  }
});

module.exports = SignUp;
