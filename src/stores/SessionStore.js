import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';
var _isInitializing = false;
var _session = null;

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
  isInitilizing() {
    return _isInitializing;
  },
  getSession() {
    return _session;
  }
});

SessionStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {

    case AppConstants.INIT_APP:
      _isInitializing = true;
      SessionStore.emitChange();
      break;

    case AppConstants.SET_SESSION:
      _isInitializing = false;
      _session = action.payload;
      SessionStore.emitChange();
      break;
  }
});

module.exports = SessionStore;
