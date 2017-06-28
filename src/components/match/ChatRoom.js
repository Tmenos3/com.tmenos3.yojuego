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

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: this.props.match,
      dsComments: this.props.dsComments,
      commentToSend: ''
    }

    this._sendComment = this._sendComment.bind(this);
    this._renderRowComment = this._renderRowComment.bind(this);
    this._onCommentTextChanged = this._onCommentTextChanged.bind(this);
  }

  render() {
    return (
      <View style={[Styles.MAIN_CONTAINER, styles.container]}>
        <View style={styles.chat}>
          <ListView
            dataSource={this.state.dsComments}
            renderRow={this._renderRowComment}
            style={styles.confirmedView}
            enableEmptySections={true}
          />
        </View>
        <View style={styles.message}>
          <TextInput
            placeholder={"Escribir..."}
            style={styles.input}
            onChangeText={this._onCommentTextChanged}
            value={this.state.commentToSend}
            underlineColorAndroid={'transparent'}
          />
          <TouchableOpacity style={styles.send} onPress={this._sendComment}>
            <Text style={styles.text}>{'Enviar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _sendComment() {
    this.props.sendComment(this.state.commentToSend);
    this.setState({ commentToSend: '' });
  }

  _renderRowComment(rowData) {
    try {
      return (
        <View
          key={rowData.id}
          style={styles.message}>
          <Text>{rowData.text}</Text>
        </View>
      );
    } catch (error) {
      return null;
    }
  }

  _onCommentTextChanged(text) {
    this.setState({
      commentToSend: text
    });
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