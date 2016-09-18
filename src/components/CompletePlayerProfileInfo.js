import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet} from 'react-native';
// import NavigationsActions from '../actions/NavigationsActions';
// import NavigationConstants from '../constants/NavigationConstants';
// import RouteConstants from '../constants/RouteConstants';
let BASEURL = 'http://192.168.0.10:8080/';
let USERID = '123456';

class CompletePlayerProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nicknameBorderColor: 'white',
      dayBorderColor: 'white',
      monthBorderColor: 'white',
      yearBorderColor: 'white',
      stateBorderColor: 'white',
      day: '',
      month: '',
      year: '',
      nickname: '',
      state: ''
    };
    this._onChangeNickname = this._onChangeNickname.bind(this);
    this._onChangeDay = this._onChangeDay.bind(this);
    this._onChangeMonth = this._onChangeMonth.bind(this);
    this._onChangeYear = this._onChangeYear.bind(this);
    this._onChangeState = this._onChangeState.bind(this);
    this._confirmProfile = this._confirmProfile.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.nicknameBorderColor }}>
          <TextInput placeholder={"Nickname"}
            style={styles.textInput}
            returnKeyType = {"done"}
            onChangeText ={this._onChangeNickname }/>
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.dayBorderColor }}>
          <TextInput placeholder={"Day"}
            style={styles.textInput}
            returnKeyType = {"done"}
            keyboardType = {"numeric"}
            onChangeText ={this._onChangeDay }/>
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.monthBorderColor }}>
          <TextInput placeholder={"Month"}
            style={styles.textInput}
            returnKeyType = {"done"}
            keyboardType = {"numeric"}
            onChangeText ={this._onChangeMonth }/>
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.yearBorderColor }}>
          <TextInput placeholder={"Year"}
            style={styles.textInput}
            returnKeyType = {"done"}
            keyboardType = {"numeric"}
            onChangeText ={this._onChangeYear}/>
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.stateBorderColor }}>
          <TextInput placeholder={"State"}
            style={styles.textInput}
            returnKeyType = {"done"}
            onChangeText ={this._onChangeState }/>
        </View>
        <TouchableOpacity style={styles.button}
          onPress={this._confirmProfile}>
          <Text> Ok </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onChangeNickname(text) {
    if (text.length <= 0) {
      this.setState({ nicknameBorderColor: 'red' });
    } else {
      this.setState({ nicknameBorderColor: 'white', nickname: text });
    }
  }

  _onChangeDay(text) {
    if (text.length <= 0) {
      this.setState({ dayBorderColor: 'red' });
    } else {
      this.setState({ dayBorderColor: 'white' , day: text});
    }
  }

  _onChangeMonth(text) {
    if (text.length <= 0) {
      this.setState({ monthBorderColor: 'red' });
    } else {
      this.setState({ monthBorderColor: 'white', month: text });
    }
  }

  _onChangeYear(text) {
    if (text.length <= 0) {
      this.setState({ yearBorderColor: 'red' });
    } else {
      this.setState({ yearBorderColor: 'white', year: text });
    }
  }

  _onChangeState(text) {
    if (text.length <= 0) {
      this.setState({ stateBorderColor: 'red' });
    } else {
      this.setState({ stateBorderColor: 'white', state: text });
    }
  }

  _confirmProfile() {
    // NavigationsActions.addRoute({
    //   id: RouteConstants.ROUTE_SIGNUP
    // });

    let _headers = new Headers();
    //_headers.append('Authorization', token);
    _headers.append('Content-Type', 'application/json');
    let form = {
      'nickname': this.state.nickname,
      'birthday': this.state.year + '-' + this.state.month + '-' + this.state.day + 'T00:00:00Z',
      'state': this.state.state,
      'adminState': 'adminState'
    };

    return fetch(BASEURL + USERID + "/player/profile", {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    })
      .then((response) => {
        if (response.ok) {
          //return response.json();
          alert('profiled saved');
        } else {
          response.json()
            .then((error) => {
              alert('error: ');
            });
        }
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
    height: 30,
    backgroundColor: 'gray',
    marginVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 160,
    height: 40,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
  }
});

module.exports = CompletePlayerProfileInfo;
