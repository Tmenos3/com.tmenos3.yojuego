import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import GroupActions from '../../actions/GroupActions';
import NavigationActions from '../../actions/NavigationActions';
import GroupStore from '../../stores/GroupStore';
import RouteConstants from '../../constants/RouteConstants';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class GroupDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingGroup: false,
      errorLoadingGroup: null,
      group: null,
      dsFriends: ds.cloneWithRows([]),
      deleteGroup: false
    }

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._renderGroupInfo = this._renderGroupInfo.bind(this);
    this._renderPlayers = this._renderPlayers.bind(this);
    this._renderPhoto = this._renderPhoto.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._renderRowFriend = this._renderRowFriend.bind(this);
    this._delete = this._delete.bind(this);
    this._exit = this._exit.bind(this);
    this._renderDeleteGroupConfirmationModal = this._renderDeleteGroupConfirmationModal.bind(this);
  }

  componentDidMount() {
    GroupStore.addChangeListener(this._onStoreChange);
    GroupActions.loadGroup(this.props.groupId);
  }

  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderLoading()}
        {this._renderGroupInfo()}
        <View style={styles.options}>
          <TouchableOpacity style={[styles.option, { backgroundColor: 'green' }]} onPress={this._exit}>
            <Text style={styles.text}>Salir del Grupo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, { backgroundColor: 'red' }]} onPress={this._delete}>
            <Text style={styles.text}>Eliminar Grupo</Text>
          </TouchableOpacity>
        </View>
        {this._renderDeleteGroupConfirmationModal()}
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      isLoadingGroup: GroupStore.isLoadingGroup(),
      errorLoadingGroup: GroupStore.getErrorLoadingGroup(),
      group: GroupStore.getGroup(),
      editGroup: GroupStore.editGroup(),
      deleteGroup: GroupStore.deleteGroup()
    }, () => {
      if (this.state.group)
        this.setState({ dsFriends: ds.cloneWithRows(this.state.group.players) });

      if (this.state.editGroup) {
        let groupToEdit = GroupStore.getGroupToEdit();
        GroupActions.editShown();
        NavigationActions.addRoute({
          id: RouteConstants.ROUTE_EDIT_GROUP,
          data: groupToEdit
        });
      }
    });
  }

  _renderLoading() {
    if (this.state.isLoadingGroup) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderDeleteGroupConfirmationModal() {
    if (this.state.deleteGroup) {
      return (
        <View style={styles.modal}>
          <View style={styles.confirmation}>
            <Text>{'Eliminar grupo ' + this.state.group.description}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity>
                <Text>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }

    return null;
  }

  _renderGroupInfo() {
    if (this.state.group) {
      return (
        <View style={styles.container}>
          {this._renderPlayers()}
        </View>
      )
    }

    return null;
  }

  _renderPlayers() {
    if (this.state.group.players.length)
      return (
        <ListView
          dataSource={this.state.dsFriends}
          renderRow={this._renderRowFriend}
          style={styles.listView}
          enableEmptySections={true}
        />
      )

    return null;
  }

  _renderError(errorMessage) {
    if (errorMessage) {
      return (
        <View>
          <Text style={styles.text}>{errorMessage}</Text>
        </View>
      )
    }

    return null;
  }

  _renderRowFriend(rowData) {
    try {
      return (
        <View key={rowData._id} style={{ borderRadius: 10 }}>
          <View style={styles.dataRowLeft}>
            {this._renderPhoto(rowData.photo)}
          </View>
          <View style={styles.dataRowRight}>
            {this._renderInfo(rowData)}
          </View>
        </View>
      );
    } catch (error) {
      return null;
    }
  }

  _renderPhoto(photo) {
    try {
      if (photo)
        return (
          <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
        );

      return (
        <Image style={styles.friendPhoto} source={require('../../statics/no_photo_friend.png')}></Image>
      );
    } catch (error) {
      return null;
    }
  }

  _renderInfo(info) {
    try {
      let ret = [];
      if (info.firstName && info.lastName) {
        ret.push(<Text key={1} style={{ fontSize: 20 }}>{info.firstName + ' ' + info.lastName}</Text>);
        ret.push(<Text key={2} style={{ fontSize: 16, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
        ret.push(<Text key={3} style={{ fontSize: 16, textAlign: 'left' }}>{!info.phone ? '' : info.phone}</Text>);
      }
      else {
        ret.push(<Text key={1} style={{ fontSize: 20, textAlign: 'left' }}>{!info.email ? '' : info.email}</Text>);
      }

      return (
        <View>
          {ret}
        </View>
      );
    } catch (error) {
      return null;
    }
  }

  _delete() {
    GroupActions.delete(this.props.groupId);
  }

  _exit() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignItems: 'center'
  },
  option: {
    height: 40,
    marginTop: 10
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  listView: {
    flex: 1,
    borderColor: 'grey',
    width: Dimensions.get('window').width * 0.9,
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
  friendPhoto: {
    width: 60,
    height: 60
  },
  options: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    marginLeft: Dimensions.get('window').width * 0.05,
    bottom: Dimensions.get('window').width * 0.025,
  }
});