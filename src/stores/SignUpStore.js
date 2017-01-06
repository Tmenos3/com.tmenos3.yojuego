import { EventEmitter } from 'events';
import assign from 'object-assign';
import SignUpConstants from '../constants/SignUpConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

var CHANGE_EVENT = 'change';
var _isWorking = false;

var SignUpStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  isWorking: () => {
    return _isWorking;
  }
});

SignUpStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case SignUpConstants.SIGNUP_INTENT:
      _isWorking = true;
      SignUpStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = SignUpStore;