import { EventEmitter } from 'events';
import assign from 'object-assign';
import FacebookConstants from '../constants/FacebookConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

let CHANGE_EVENT = 'change';
let _isAuthCompleted = false;
let _isFirstLogin = false;

let FacebookStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  isAuthCompleted: () => {
    return _isAuthCompleted;
  },
  isFirstLogin: () => {
    return _isFirstLogin;
  }
});

FacebookStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FacebookConstants.LOGIN_RESOLVED:
      _isAuthCompleted = true;
      _isFirstLogin = action.payload.isFirstLogin;
      FacebookStore.emitChange();
    default:
      break;
  }
});

module.exports = FacebookStore;
