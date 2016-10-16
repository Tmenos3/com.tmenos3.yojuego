import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import PlayerConstants from '../constants/PlayerConstants';

var CHANGE_EVENT = 'change';
var _loadingPlayer = false;
var _creatingPlayer = false;
var _player = null;
var _signUpInfo = {
  username: null,
  password: null,
  nickname: null,
  state: null,
  adminState: null,
  day: null,
  month: null,
  year: null
};
var _signUpStepOneComplete = false;

var PlayerStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  loadingPlayer() {
    return _loadingPlayer;
  },
  creatingPlayer() {
    return _creatingPlayer;
  },
  getPlayer() {
    return _player;
  },
  getSignUpInfo() {
    return _signUpInfo;
  },
  signUpStepOneComplete(){
    return _signUpStepOneComplete;
  }
});

PlayerStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case PlayerConstants.SET_PLAYER:
      _loadingPlayer = false;
      _creatingPlayer = false;
      _player = action.payload;
      PlayerStore.emitChange();
      break;

    case PlayerConstants.GET_PLAYER:
      _loadingPlayer = true;
      PlayerStore.emitChange();
      break;

    case PlayerConstants.CREATE_PLAYER:
      _loadingPlayer = false;
      _creatingPlayer = true;
      PlayerStore.emitChange();
      break;

    case PlayerConstants.SET_SIGNUP_STEPONE:
      _signUpInfo.username = action.payload.username;
      _signUpInfo.password = action.payload.password;
      _signUpStepOneComplete = true;
      PlayerStore.emitChange();
      break;
  }
});

module.exports = PlayerStore;
