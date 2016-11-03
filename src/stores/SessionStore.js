import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import SessionConstants from '../constants/SessionConstants';
import PlayerConstants from '../constants/PlayerConstants';

var CHANGE_EVENT = 'change';
var _token = null;
var _player = null;
var _mail = null;
var _mailSent = null;
var _errorSendingMail = null;
var _logingIn = false;

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
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
  }
});

SessionStore.dispatchToken = AppDispatcher.register(function (action) {
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
