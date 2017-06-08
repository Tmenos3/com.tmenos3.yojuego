import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class ModalMessage extends Component {
  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.confirmation}>
          <Text style={styles.confirmationText}>{this.props.text}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={this.props.confirm} style={[styles.confirmationButton, { backgroundColor: 'green' }]}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.cancel} style={[styles.confirmationButton, { backgroundColor: 'gray' }]}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmation: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.25,
    borderRadius: 5
  },
  confirmationText: {
    fontSize: 30,
    textAlign: 'center'
  },
  modalButtons: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0
  },
  confirmationButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
