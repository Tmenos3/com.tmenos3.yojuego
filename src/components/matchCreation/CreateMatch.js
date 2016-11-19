import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ListView
} from 'react-native';
import CollapsablePanel from '../CollapsablePanel';

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this._renderButton = this._renderButton.bind(this);
    this._renderDateTime + this._renderDateTime.bind(this);
  }


  render() {
    let _scrollView = ScrollView;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; } }
          automaticallyAdjustContentInsets={true}
          scrollEventThrottle={200}
          style={styles.scrollView}>
          {this._renderDateTime()}
        </ScrollView>

      </View>
    );
  }

  _renderButton(valor) {
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>
          valor
        </Text>
      </TouchableOpacity>
    );
  }

  _renderDateTime() {
    return (
      <CollapsablePanel style={styles.sectionPlayers} title='Jugadores'>
        <ListView


          horizontal={true}
          enableEmptySections={true}
          />
        <ListView


          horizontal={true}
          enableEmptySections={true}
          />
        <TouchableOpacity style={styles.buttonAddPlayer} onPress={this._addPlayer}>

        </TouchableOpacity>
      </CollapsablePanel>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15
  },
  scrollView: {
    backgroundColor: '#d9d9d9',
  },
  sectionPlayers: {
    marginTop: 6,
    marginBottom: 20,
    marginRight: 6,
    marginLeft: 6,
    borderBottomWidth: 0.5,
    backgroundColor: '#F6F6F6',
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    height: 30,
    alignSelf: 'stretch',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  topButtons: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
  }
});

module.exports = CreateMatch;