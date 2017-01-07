import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';
import PlayerStore from '../../stores/PlayerStore';
import PlayerActions from '../../actions/PlayerActions';

class PlayerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nicknameBorderColor: 'white',
      dayBorderColor: 'white',
      monthBorderColor: 'white',
      yearBorderColor: 'white',
      stateBorderColor: 'white',
      adminStateBorderColor: 'white',
      day: '',
      month: '',
      year: '',
      nickname: '',
      birthday: '',
      state: '',
      adminState: '',
      creatingPlayer: false
    };

    this._onChangeNickname = this._onChangeNickname.bind(this);
    this._onPlayerInfoChange = this._onPlayerInfoChange.bind(this);
    this._confirmProfile = this._confirmProfile.bind(this);
    this._onChangeDay = this._onChangeDay.bind(this);
    this._onChangeMonth = this._onChangeMonth.bind(this);
    this._onChangeYear = this._onChangeYear.bind(this);
    this._onChangeState = this._onChangeState.bind(this);
    this._onChangeAdminState = this._onChangeAdminState.bind(this);
  }

  componentDidMount() {
    PlayerStore.addChangeListener(this._onPlayerInfoChange);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._onPlayerInfoChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.nicknameBorderColor }}>
          <TextInput placeholder={"Nickname"}
            style={styles.textInput}
            returnKeyType={"done"}
            onChangeText={this._onChangeNickname} />
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.dayBorderColor }}>
          <TextInput placeholder={"Day"}
            style={styles.textInput}
            returnKeyType={"done"}
            keyboardType={"numeric"}
            onChangeText={this._onChangeDay} />
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.monthBorderColor }}>
          <TextInput placeholder={"Month"}
            style={styles.textInput}
            returnKeyType={"done"}
            keyboardType={"numeric"}
            onChangeText={this._onChangeMonth} />
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.yearBorderColor }}>
          <TextInput placeholder={"Year"}
            style={styles.textInput}
            returnKeyType={"done"}
            keyboardType={"numeric"}
            onChangeText={this._onChangeYear} />
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.stateBorderColor }}>
          <TextInput placeholder={"State"}
            style={styles.textInput}
            returnKeyType={"done"}
            onChangeText={this._onChangeState} />
        </View>
        <View style={{ marginVertical: 1, borderWidth: 1, borderColor: this.state.adminStateBorderColor }}>
          <TextInput placeholder={"Adminstate"}
            style={styles.textInput}
            returnKeyType={"done"}
            onChangeText={this._onChangeAdminState} />
        </View>
        <TouchableOpacity style={styles.button}
          onPress={this._confirmProfile}>
          <Text>{this.state.creatingPlayer ? 'Working...' : 'OK'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={this._backPressed}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onPlayerInfoChange() {
    if (PlayerStore.creatingPlayer()) {
      this.setState({ creatingPlayer: true });
    } else if (!PlayerStore.creatingPlayer() && PlayerStore.getPlayer() != null) {
      NavigationActions.replaceRoute({
        id: RouteConstants.ROUTE_HOME
      });
    }
  }

  _onChangeNickname(text) {
    if (text.length <= 0) {
      this.setState({ nicknameBorderColor: 'red', nickname: null });
    } else {
      this.setState({ nicknameBorderColor: 'white', nickname: text });
    }
  }

  _onChangeDay(text) {
    if (text.length <= 0) {
      this.setState({ dayBorderColor: 'red' });
    } else {
      this.setState({ dayBorderColor: 'white', day: text });
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

  _onChangeAdminState(text) {
    if (text.length <= 0) {
      this.setState({ adminStateBorderColor: 'red' });
    } else {
      this.setState({ adminStateBorderColor: 'white', adminState: text });
    }
  }

  _backPressed() {
    NavigationActions.replaceRoute({
      id: RouteConstants.ROUTE_LOGIN
    });
  }

  _confirmProfile() {
    let y = parseInt(this.state.year);
    let m = parseInt(this.state.month) - 1;
    let d = parseInt(this.state.day);
    let date = new Date(y, m, d).toISOString();
    PlayerActions.createPlayer(this.state.nickname, date, this.state.state, this.state.adminState);
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

module.exports = PlayerSignUp;
