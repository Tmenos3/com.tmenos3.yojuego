import moment from 'moment';
import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import MatchInvitationActions from '../../actions/MatchInvitationActions';
import HomeActions from '../../actions/HomeActions';
import NavigationActions from '../../actions/NavigationActions';
import MatchInvitationStore from '../../stores/MatchInvitationStore';

export default class MatchInvitationBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
      errorSaving: null,
      action: null
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._renderError = this._renderError.bind(this);
    this._accetp = this._accetp.bind(this);
    this._reject = this._reject.bind(this);
  }

  componentDidMount() {
    MatchInvitationStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    MatchInvitationStore.removeChangeListener(this._onStoreChange);
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderError(this.state.errorSaving)}
        <Text key={1} style={{ fontSize: 28 }}>{'Info del partido'}</Text>
        <Text key={2} style={{ fontSize: 16 }}>{'Descripcion: ' + this.props.matchInvitation.match.title}</Text>
        <Text key={3} style={{ fontSize: 16 }}>{'Fecha: ' + moment(this.props.matchInvitation.match.date).format('DD/MM/YYYY')}</Text>
        <Text key={4} style={{ fontSize: 16 }}>{'Hora: ' + this.props.matchInvitation.match.fromTime + ' - ' + this.props.matchInvitation.match.toTime}</Text>
        <Text key={5} style={{ fontSize: 16 }}>{'Cancha: ' + this.props.matchInvitation.match.location}</Text>
        <Text key={6} style={{ fontSize: 28 }}>{'Te invitó'}</Text>        
        <Text key={7} style={{ fontSize: 20 }}>{this.props.matchInvitation.sender.firstName + ' ' + this.props.matchInvitation.sender.lastName}</Text>
        <Text key={8} style={{ fontSize: 16 }}>{!this.props.matchInvitation.sender.email ? '' : this.props.matchInvitation.sender.email}</Text>
        <Text key={9} style={{ fontSize: 16 }}>{!this.props.matchInvitation.sender.phone ? '' : this.props.matchInvitation.sender.phone}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this._accetp} style={[styles.button, { backgroundColor: 'green' }]}>
            <Text style={styles.menuText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._reject} style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.menuText}>Reject</Text>
          </TouchableOpacity>
        </View>
        {this._renderLoading(this.state.isSaving)}
      </View>
    );
  }

  _reject() {
    this.setState({ action: 'reject' }, () => {
      MatchInvitationActions.reject(this.props.matchInvitation);
    });
  }

  _accetp() {
    this.setState({ action: 'accetp' }, () => {
      MatchInvitationActions.accept(this.props.matchInvitation);
    });
  }

  _onStoreChange() {
    this.setState({
      isSaving: MatchInvitationStore.isSaving(),
      errorSaving: MatchInvitationStore.getErrorSaving()
    }, () => {
      if (!this.state.isSaving && !this.state.errorSaving)
        this.setState({ errorSavingNewFriend: 'Invitacion a partido ' + (this.state.action == 'accept' ? 'aceptad0.' : 'rechazado.') }, () => {
          setTimeout(() => {
            NavigationActions.back();
          }, 1500);
        });
    });
  }

  _renderLoading(show) {
    if (show) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    }

    return null;
  }

  _renderError(message) {
    if (message) {
      return (
        <View>
          <Text style={[styles.text, { color: 'red' }]}>{message}</Text>
        </View>
      )
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    paddingTop: 10
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center'
  },
  friendPhoto: {
    width: 70,
    height: 70
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  }
});