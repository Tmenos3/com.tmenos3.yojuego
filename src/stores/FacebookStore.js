import { EventEmitter } from 'events';
import assign from 'object-assign';
import FacebookConstants from '../constants/FacebookConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

const CHANGE_EVENT = 'change';
let _isAuthCompleted = false;
let _isFirstLogin = false;

export default class FacebookStore extends EventEmitter {
  static emitChange() {
    this.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  static isAuthCompleted() {
    return _isAuthCompleted;
  }

  static isFirstLogin() {
    return _isFirstLogin;
  }
}

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
