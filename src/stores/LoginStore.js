import { EventEmitter } from 'events';
import assign from 'object-assign';
import LoginConstants from '../constants/LoginConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

var CHANGE_EVENT = 'change';
var _isWorking = false;
var _isLoginCompleted = false;
var _loginErrorReturn = null;

var LoginStore = assign({}, EventEmitter.prototype, {
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
  },
  isLoginCompleted: () => {
    return _isLoginCompleted;
  },
  loginErrorReturn: () => {
    return _loginErrorReturn;
  }
});

LoginStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case LoginConstants.LOGIN_INTENT:
      _isWorking = true;
      _isLoginCompleted = false;
      _loginErrorReturn = null;
      LoginStore.emitChange();
      break;

    case LoginConstants.LOGIN_RESOLVED:
      _isWorking = false;
      _isLoginCompleted = true;
      _loginErrorReturn = null;
      LoginStore.emitChange();
      break;

    case LoginConstants.LOGIN_FAILED:
      _isWorking = false;
      _isLoginCompleted = true;
      _loginErrorReturn = action.payload.message;
      LoginStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = LoginStore;
