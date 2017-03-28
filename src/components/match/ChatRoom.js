import React, { Component } from 'react';
import {
  View,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Dimensions
} from 'react-native';
import Styles from '../../constants/Styles';

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  render() {
    return (
      <View style={[Styles.MAIN_CONTAINER, styles.container]}>
        <View style={styles.chat}>
        </View>
        <View style={styles.message}>
          <TextInput
            placeholder={"Escribí un mensaje"}
            style={styles.input}
            onChangeText={(text) => { this.setState({ message: text }) }}
            text={this.state.message}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity style={styles.send} onPress={this._sendMessage}>
            <Text style={styles.text}>{'Enviar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _sendMessage() {

  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  chat: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    height: Dimensions.get('window').height * 0.71,
    marginTop: 10
  },
  message: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.95,
    height: 60,
    bottom: 0,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: Dimensions.get('window').width * 0.94,
    flex: 1,
    fontSize: 20,
    color: 'black'
  },
  send: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});