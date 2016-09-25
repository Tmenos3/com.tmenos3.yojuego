import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import SessionConstants from '../constants/SessionConstants';

var CHANGE_EVENT = 'change';
var _isInitializing = false;
var _session = null;
let _loadingPlayer = false;
let _settingPlayer = false;

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
  getSession() {
    return _session;
  },
  loadingPlayer() {
    return _loadingPlayer;
  },
  settingPlayer() {
    return _settingPlayer;
  }
});

SessionStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case SessionConstants.SET_SESSION:
      _isInitializing = false;
      _session = action.payload;
      _loadingPlayer = _session != null && (!_session.player || _session.player == null);
      SessionStore.emitChange();
      break;

    case SessionConstants.SET_PLAYER:
      _session.player = action.payload;
      _loadingPlayer = false;
      SessionStore.emitChange();
      break;

    case SessionConstants.SETTING_PLAYER:
      _session.player = null;
      _loadingPlayer = false;
      _settingPlayer = true;
      SessionStore.emitChange();
      break;
  }
});

module.exports = SessionStore;
