import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import LoginConstants from '../constants/LoginConstants';

const CHANGE_EVENT = 'change';
let _isWorking = false;
let _isLoginCompleted = false;
let _loginErrorReturn = null;
let _isFirstLogin = false;

let LoginStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isWorking() {
    return _isWorking;
  },

  isLoginCompleted() {
    return _isLoginCompleted;
  },

  loginErrorReturn() {
    return _loginErrorReturn;
  },

  isFirstLogin() {
    return _isFirstLogin;
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
      _isFirstLogin = action.payload.isFirstLogin;
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