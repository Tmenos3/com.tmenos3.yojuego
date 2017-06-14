import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import GroupActions from '../../actions/GroupActions';
import GroupStore from '../../stores/GroupStore';

export default class GroupDetailHeader extends Component {
  constructor(props) {
    super(props);

    this._renderDescription = this._renderDescription.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._edit = this._edit.bind(this);

    this.state = {
      group: null
    }
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
        {this._renderDescription()}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this._edit} style={styles.menuButton}>
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._back} style={styles.menuButton}>
            <Text style={styles.menuText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onStoreChange() {
    this.setState({
      group: GroupStore.getGroup()
    });
  }

  _renderDescription() {
    if (this.state.group)
      return (<Text style={styles.groupName}>{this.state.group.description}</Text>);

    return null;
  }

  _edit() {
    GroupActions.edit(this.state.group);
  }

  _back() {
    GroupActions.back();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009900',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuButton: {
    width: Dimensions.get('window').width * 0.2,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff',
    marginRight: Dimensions.get('window').width * 0.05
  },
  menuText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  groupName: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10
  },
  buttons: {
    flexDirection: 'row',
  }
});