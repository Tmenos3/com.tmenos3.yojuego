import { EventEmitter } from 'events';
import LoginConstants from '../constants/LoginConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

const CHANGE_EVENT = 'change';
let _isWorking = false;
let _isLoginCompleted = false;
let _loginErrorReturn = null;

export default class LoginStore extends EventEmitter {
  static emitChange() {
    this.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  static isWorking() {
    return _isWorking;
  }

  static isLoginCompleted() {
    return _isLoginCompleted;
  }

  static loginErrorReturn() {
    return _loginErrorReturn;
  }
}

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