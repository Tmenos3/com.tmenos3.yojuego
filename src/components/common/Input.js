import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
} from 'react-native';

export default class Input extends Component {
  render() {
    return (
      <View style={[styles.inputContainer, this.props.containerStyle]}>
        <TextInput
          {...this.props}
          style={[styles.input, this.props.inputStyle]}
          underlineColorAndroid={'transparent'}
        />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40
  },
  input: {
    width: Dimensions.get('window').width * 0.94
  },
});