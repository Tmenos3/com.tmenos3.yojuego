import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet} from 'react-native';
// import NavigationsActions from '../actions/NavigationsActions';
// import NavigationConstants from '../constants/NavigationConstants';
// import RouteConstants from '../constants/RouteConstants';

class CompletePlayerProfileInfo extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentRow}>
          <View style={styles.contentColumn}>
            <View style={styles.contentRow}>
            </View>
            <View style={styles.contentRow}>
            </View>
          </View>
          <View style={styles.contentColumn}>
          </View>
        </View>
        <View style={styles.contentRow}>
          <View style={styles.contentColumn}>
          </View>
          <View style={styles.contentColumn}>
          </View>
        </View>
        <View style={styles.contentRow}>
          <View style={styles.contentColumn}>
          </View>
          <View style={styles.contentColumn}>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1                  //Step 1
  },
  // toolbar: {
  //   backgroundColor: '#81c04d',
  //   paddingTop: 30,
  //   paddingBottom: 10,
  //   flexDirection: 'row'    //Step 1
  // },
  // toolbarButton: {
  //   width: 50,            //Step 2
  //   color: '#fff',
  //   textAlign: 'center'
  // },
  // toolbarTitle: {
  //   color: '#fff',
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   flex: 1                //Step 3
  // },
  // …
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
    borderWidth: 1
  },
  contentColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
    borderWidth: 1
  },
  // messageBox: {
  //   flex: 1,
  //   backgroundColor: '#ef553a',
  //   paddingTop: 10,
  //   paddingBottom: 20,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   borderRadius: 10
  // },
  // messageBoxTitleText: {
  //   fontWeight: 'bold',
  //   color: '#fff',
  //   textAlign: 'center',
  //   fontSize: 20,
  //   marginBottom: 10
  // },
  // messageBoxBodyText: {
  //   color: '#fff',
  //   fontSize: 16
  // }
});
module.exports = CompletePlayerProfileInfo;
