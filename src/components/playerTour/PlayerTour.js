import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PlayerTourActions from '../../actions/PlayerTourActions';
import PlayerTourStore from '../../stores/PlayerTourStore';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';

export default class PlayerTour extends Component {
  constructor(props) {
    super(props);

    this._tourCompleted = this._tourCompleted.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);

    this.state = {
      isTourCompleted: false
    }
  }

  render() {
    return (
      <Swiper style={styles.container} showsButtons={false}>
        <View style={styles.slide}>
          <Text style={styles.text}>Elegi la fecha</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Busca una cancha</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Invita a tus amigos</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Reservala al toque roque</Text>
          <TouchableOpacity style={styles.button} onPress={this._tourCompleted}>
            <Text style={styles.buttonText}>Joya!!!</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }

  componentDidMount() {
    PlayerTourStore.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    PlayerTourStore.removeChangeListener(this._onStoreChange);
  }

  _tourCompleted() {
    PlayerTourActions.tourCompleted();
  }

  _onStoreChange() {
    this.setState({
      isTourCompleted: PlayerTourStore.isTourCompleted()
    }, () => {
      if (this.state.isTourCompleted) {
        NavigationActions.replaceRoute({
          id: RouteConstants.ROUTE_HOME
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontSize: 50,
    textAlign: 'center'
  },
  button: {
    width: Dimensions.get('window').width * 0.3,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff'
  }
});

module.exports = PlayerTour;