import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  BackAndroid,
  Image
} from 'react-native';
import HomeActions from '../../actions/HomeActions';
import HomeStore from '../../stores/HomeStore';
import NavigationActions from '../../actions/NavigationActions';
import RouteConstants from '../../constants/RouteConstants';
import Styles from '../../constants/Styles';

const MENU_WIDTH_CLOSED = 0;
const MENU_WIDTH_OPENED = Dimensions.get('window').width * 0.8;
const BACKGROUND_MENU_WIDTH_CLOSED = 0;
const BACKGROUND_MENU_WIDTH_OPENED = Dimensions.get('window').width;
const SIDE_MENU_WIDTH_CLOSED = 0;
const SIDE_MENU_WIDTH_OPENED = Dimensions.get('window').width * 0.2;

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this._onStoreChange = this._onStoreChange.bind(this);
    this._back = this._back.bind(this);
    this._logOut = this._logOut.bind(this);
    this._account = this._account.bind(this);
    this._settings = this._settings.bind(this);
    this._notifications = this._notifications.bind(this);

    this.state = {
      menuWidth: MENU_WIDTH_CLOSED,
      backgroundMenuWidth: BACKGROUND_MENU_WIDTH_CLOSED,
      sideWidth: SIDE_MENU_WIDTH_CLOSED,
      isLoggingOut: false,
      logOutDone: false,
      errorLoggingOut: null
    }
  }

  componentDidMount() {
    HomeStore.addChangeListener(this._onStoreChange);
    BackAndroid.addEventListener('hardwareBackPress', this._back);
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this._onStoreChange);
    BackAndroid.removeEventListener('hardwareBackPress', this._back);
  }

  render() {
    return (
      <View style={[styles.menuBackground, { width: this.state.backgroundMenuWidth }]}>
        <View style={[styles.sideList, { width: this.state.sideWidth }]}>
          <TouchableOpacity onPress={this._back} style={styles.sideListButton}></TouchableOpacity>
        </View>
        <View style={[styles.menuList, { width: this.state.menuWidth }]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {this._renderPhoto(this.props.player.photo)}
            </View>
            <View style={styles.headerRight}>
              <Text key={1} style={styles.nameText}>{'¡Hola ' + this.props.player.firstName + '!'}</Text>
              <Text key={2} style={{ fontSize: 20 }}>{this.props.player.email}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={this._account} style={[styles.menuOption, { marginTop: 10 }]}>
            <View style={styles.rowLeft}>
              <Image style={styles.icon} source={require('../../statics/facebook-logo-white.png')}></Image>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.menuOptionText}>Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._notifications} style={styles.menuOption}>
            <View style={styles.rowLeft}>
              <Image style={styles.icon} source={require('../../statics/facebook-logo-white.png')}></Image>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.menuOptionText}>Notifications</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._settings} style={styles.menuOption}>
            <View style={styles.rowLeft}>
              <Image style={styles.icon} source={require('../../statics/facebook-logo-white.png')}></Image>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.menuOptionText}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._help} style={styles.menuOption}>
            <View style={styles.rowLeft}>
              <Image style={styles.icon} source={require('../../statics/facebook-logo-white.png')}></Image>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.menuOptionText}>Help</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._aboutUs} style={styles.menuOption}>
            <View style={styles.rowLeft}>
              <Image style={styles.icon} source={require('../../statics/facebook-logo-white.png')}></Image>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.menuOptionText}>About Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._logOut} style={styles.menuOption}>
            <View style={styles.rowLeft}>
              <Image style={styles.icon} source={require('../../statics/facebook-logo-white.png')}></Image>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.menuOptionText}>Log Out</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._back} style={styles.menuBtnBack}>
            <Text style={styles.menuBtnBackText}>Atras</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderPhoto(photo) {
    if (photo)
      return (
        <Image style={styles.photo} source={require('../../statics/no_photo_friend.png')}></Image>
      );

    return (
      <Image style={styles.photo} source={require('../../statics/no_photo_friend.png')}></Image>
    );
  }

  _back() {
    HomeActions.hideMenu();
  }

  _logOut() {
    HomeActions.logOut();
  }

  _settings() {
    HomeActions.showSettings();
  }

  _account() {
    HomeActions.showAccount();
  }

  _notifications() {
    HomeActions.showNotificationSettings();
  }

  _help() {
    HomeActions.showHelp();
  }

  _aboutUs() {
    HomeActions.showAboutUs();
  }

  _onStoreChange() {
    this.setState({
      menuWidth: HomeStore.mustShowMenu() ? MENU_WIDTH_OPENED : MENU_WIDTH_CLOSED,
      backgroundMenuWidth: HomeStore.mustShowMenu() ? BACKGROUND_MENU_WIDTH_OPENED : BACKGROUND_MENU_WIDTH_CLOSED,
      sideWidth: HomeStore.mustShowMenu() ? SIDE_MENU_WIDTH_OPENED : SIDE_MENU_WIDTH_CLOSED,
      isLoggingOut: HomeStore.isLoggingOut(),
      logOutDone: HomeStore.logOutDone(),
      errorLoggingOut: HomeStore.getErrorLoggingOut()
    }, () => {
      if (this.state.logOutDone)
        NavigationActions.resetToRoute({
          id: RouteConstants.ROUTE_LOGIN
        });
    });
  }
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: Styles.MAIN_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuBackground: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  menuList: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    right: 0,
    backgroundColor: Styles.MAIN_BACKGROUND_COLOR,
  },
  menuBtnBack: {
    width: Dimensions.get('window').width * 0.2,
    height: 40,
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.012,
    backgroundColor: '#33adff',
    marginRight: Dimensions.get('window').width * 0.05
  },
  menuBtnBackText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  menuOption: {
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    justifyContent: 'flex-start',
    marginRight: Dimensions.get('window').width * 0.05,
    flexDirection: 'row',
    marginLeft: 20
  },
  menuOptionText: {
    color: 'dimgray',
    fontSize: 20,
    textAlign: 'center',
  },
  sideList: {
    backgroundColor: 'transparent',
    height: Dimensions.get('window').height,
    position: 'absolute',
    left: 0
  },
  sideListButton: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  headerLeft: {
    width: 100,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  rowLeft: {
    width: 50,
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 15
  },
  photo: {
    width: 75,
    height: 75
  },
  nameText: {
    fontSize: 30
  },
  icon: {
    height: 25,
    width: 25
  }
});