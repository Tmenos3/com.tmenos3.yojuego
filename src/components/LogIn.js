import React, { Component } from 'react';
import {
  Text,
  Platform,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  StyleSheet} from 'react-native';

class LogIn extends Component {
  render() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={styles.background}>
        <Text style={styles.text}>
          Usuario
        </Text>
        <TextInput style={styles.textInput}/>
        <Text style={styles.text}>
          Password
        </Text>
        <TextInput style={styles.textInput}/>
        <TouchableElement
          style={styles.button}
          onPress={this.buttonClicked.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Ok</Text>
          </View>
        </TouchableElement>
        <Text style={styles.link}>
          You have not an account yet? Sign up here!!!
        </Text>
      </View>
    );
  }

  buttonClicked(){
    alert("Clicked");
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    color: 'black',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: "white",
  },
  link: {
    fontSize: 10,
    color: 'blue',
    textAlign: 'center',
  },
  button: {
    width: 50,
    height: 25,
    backgroundColor: 'red'
  },
  buttonText: {
    height: 30,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: "red",
    textAlign: 'center',
  },
});

module.exports = LogIn;
