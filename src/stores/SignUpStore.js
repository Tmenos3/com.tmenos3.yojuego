import { EventEmitter } from 'events';
import assign from 'object-assign';
import SignUpConstants from '../constants/SignUpConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

var CHANGE_EVENT = 'change';
var _isWorking = false;
var _isSignUpCompleted = false;
var _signUpErrorReturn = null;

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
  },
  isSignUpCompleted: () => {
    return _isSignUpCompleted;
  },
  signUpErrorReturn: () => {
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