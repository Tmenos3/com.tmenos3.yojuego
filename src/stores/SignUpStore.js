import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import SignUpConstants from '../constants/SignUpConstants';

const CHANGE_EVENT = 'change';
let _isWorking = false;
let _isSignUpCompleted = false;
let _signUpErrorReturn = null;

let SignUpStore = assign({}, EventEmitter.prototype, {
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

  isSignUpCompleted() {
    return _isSignUpCompleted;
  },

  signUpErrorReturn() {
    return _signUpErrorReturn;
  }
});

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

module.exports = SignUpStore;