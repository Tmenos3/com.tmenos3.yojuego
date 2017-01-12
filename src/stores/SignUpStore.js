import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import SignUpConstants from '../constants/SignUpConstants';

const CHANGE_EVENT = 'change';
let _isWorking = false;
let _isSignUpCompleted = false;
let _signUpErrorReturn = null;

export default class SignUpStore extends EventEmitter {
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
  static isSignUpCompleted() {
    return _isSignUpCompleted;
  }
  static signUpErrorReturn() {
    return _signUpErrorReturn;
  }
}

SignUpStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case SignUpConstants.SIGNUP_INTENT:
      _isWorking = true;
      _isSignUpCompleted = false;
      _signUpErrorReturn = null;
      SignUpStore.emitChange();
      break;

    case SignUpConstants.SIGNUP_RESOLVED:
      _isWorking = false;
      _isSignUpCompleted = true;
      _signUpErrorReturn = null;
      SignUpStore.emitChange();
      break;

    case SignUpConstants.SIGNUP_FAILED:
      _isWorking = false;
      _isSignUpCompleted = true;
      _signUpErrorReturn = action.payload.message;
      SignUpStore.emitChange();
      break;

    default:
      break;
  }
});