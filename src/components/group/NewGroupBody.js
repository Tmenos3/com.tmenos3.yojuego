import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch,
  Image,
  ActivityIndicator
} from 'react-native';
import GroupActions from '../../actions/GroupActions';
import NavigationActions from '../../actions/NavigationActions';
import GroupStore from '../../stores/GroupStore';
import RouteConstants from '../../constants/RouteConstants';

export default class NewGroupBody extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let dict = [];
    for (let i = 0; i < this.props.friends.length; i++) {
      dict.push({ key: this.props.friends[i]._id, data: this.props.friends[i], checked: false });
    }

    this.state = {
      isSavingNewGroup: false,
      errorSavingNewGroup: null,
      errorMessage: '',
      description: '',
      friends: dict,
      rows: ds.cloneWithRows(dict),
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._onDescriptionTextChanged = this._onDescriptionTextChanged.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderRowFriend = this._renderRowFriend.bind(this);
    this._switchChanged = this._switchChanged.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._checkRow = this._checkRow.bind(this);
  }

  componentDidMount() {
    GroupStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoading()}
        <Text style={styles.text}>Nuevo Grupo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={"Descripcion"}
            style={styles.input}
            onChangeText={this._onDescriptionTextChanged}
            text={this.state.description}
            underlineColorAndroid={'transparent'}
            />
        </View>
        <ListView
          dataSource={this.state.rows}
          renderRow={this._renderRowFriend}
          style={styles.listView}
          enableEmptySections={true}
          />
        {this._renderError()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isSavingNewGroup: GroupStore.isSavingNewGroup(),
      errorSavingNewGroup: GroupStore.getErrorSavingNewGroup()
    }, () => {
      if (GroupStore.isNewGroupConfirmed()) {
        if (!this.state.description) {
          this.setState({ errorSavingNewGroup: 'Completa al menos un dato.' });
        } else {
          GroupActions.confirmNewGroup(this.state.description);
        }
      } else if (!this.state.isSavingNewGroup && !this.state.errorSavingNewGroup) {
        this.setState({ errorSavingNewGroup: 'Amigo guardado.' }, () => {
          setTimeout(() => {
            NavigationActions.back();
            GroupActions.groupsUpdated();
          }, 3000);
        });
      }
    });
  }


  _renderLoading() {
    if (this.state.isSavingNewGroup) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderError() {
    if (this.state.errorSavingNewGroup) {
      return (
        <View>
          <Text style={[styles.text, { color: 'red' }]}>{this.state.errorSavingNewGroup}</Text>
        </View>
      )
    }

    return null;
  }

  _onDescriptionTextChanged(text) {
    this.setState({
      description: text
    });
  }

  _renderRowFriend(rowData) {
    return (
      <View key={rowData.key} style={{ borderRadius: 10 }}>
        <View style={styles.dataRow}>
          <View style={styles.dataRowLeft}>
            {this._renderPhoto(rowData.data.info.photo)}
          </View>
          <View style={styles.dataRowRight}>
            {this._renderInfo(rowData.data.info)}
          </View>

          <Switch
            onValueChange={(value) => this._switchChanged(value, rowData)}
            style={{ marginBottom: 10 }}
            value={rowData.checked} />
        </View>
      </View>
    );
  }

  _switchChanged(value, rowData) {
    let members = this.state.friends;
    let position = -1;
    for (let i = 0; i < members.length; i++) {
      if (members[i].key == rowData.key) {
        position = i;
        break;
      }
    }

    members[position].checked = value;

    this.setState({ rows: this.state.rows.cloneWithRows(members) });
  }

  _checkRow(id) {
    let x = this.state.selectedMembers[id];
    return x;
  }

  _renderPhoto(photo) {
    if (photo)
      return (
        <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
      );

    return (
      <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
    );
  }

  _renderInfo(info) {
    let ret = [];
    if (info.firstName && info.lastName) {
      ret.push(<Text key={1} style={{ fontSize: 20 }}>{info.firstName + ' ' + info.lastName}</Text>);
      ret.push(<Text key={2} style={{ fontSize: 16, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
      ret.push(<Text key={3} style={{ fontSize: 16, textAlign: 'left' }}>{!info.phone ? '' : info.phone}</Text>);
    }
    else {
      ret.push(<Text key={1} style={{ fontSize: 20, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
      ret.push(<Text key={2} style={{ fontSize: 16, textAlign: 'left' }}>{!info.phone ? '' : info.phone}</Text>);
    }

    return (
      <View>
        {ret}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40
  },
  input: {
    width: Dimensions.get('window').width * 0.94
  },
  friendPhoto: {
    width: 60,
    height: 60
  },
  dataRowLeft: {
    width: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataRowRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dataRow: {
    marginTop: 6,
    marginHorizontal: 6,
    borderBottomWidth: 0.5,
    height: 60,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    borderRadius: 5
  },
  listView: {
    flex: 1,
    borderColor: 'grey'
  },
});