import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import PlayerConstants from '../constants/PlayerConstants';
import SessionConstants from '../constants/SessionConstants';

const CHANGE_EVENT = 'change';
let _token = null;
let _player = null;
let _mail = null;
let _mailSent = null;
let _errorSendingMail = null;
let _logingIn = false;
let _signUpInfo = {
  email: null,
  password: null
};
let _signUpStepOneComplete = false;
let _signUpStepTwoComplete = false;

let SessionStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getToken() {
    return _token;
  },

  getPlayer() {
    return _player;
  },

  getMail() {
    return _mail;
  },

  mailSent() {
    return _mailSent;
  },

  errorSendingMail() {
    return _errorSendingMail;
  },

  logingIn() {
    return _logingIn;
  },

  getSignUpInfo() {
    return _signUpInfo;
  },

  signUpStepOneComplete() {
    return _signUpStepOneComplete;
  },

  signUpComplete() {
    return _signUpStepTwoComplete;
  }
});

SessionStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case SessionConstants.SET_SESSION:
      _token = action.payload.token;
      _player = action.payload.player;
      SessionStore.emitChange();
      break;

    case SessionConstants.SEND_MAIL_RESTORE_PASSWORD:
      _mail = action.payload.mail;
      SessionStore.emitChange();
      break;

    case SessionConstants.MAIL_SENT:
      _mailSent = action.payload.sent;
      _errorSendingMail = action.payload.error;
      SessionStore.emitChange();
      break;

    case PlayerConstants.SET_PLAYER:
      _player = action.payload;
      SessionStore.emitChange();
      break;

    case SessionConstants.SESSION_LOGIN_INTENT:
      _logingIn = true;
      SessionStore.emitChange();
      break;

    case SessionConstants.SESSION_LOGIN_ERROR:
      _logingIn = false;
      SessionStore.emitChange();
      break;
  }
});

module.exports = SessionStore;