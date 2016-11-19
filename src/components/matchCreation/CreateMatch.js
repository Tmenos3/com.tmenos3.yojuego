import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class CreateMatch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
              Fecha
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
              Hora
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    height: 30,
    alignSelf: 'stretch',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  topButtons: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
  }
});

module.exports = CreateMatch;