import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import FacebookConstants from '../constants/FacebookConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isAuthCompleted = false;
let _isFirstLogin = false;

let FacebookStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isAuthCompleted() {
    return _isAuthCompleted;
  },

  isFirstLogin() {
    return _isFirstLogin;
  }
});

FacebookStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FacebookConstants.LOGIN_RESOLVED:
      _isAuthCompleted = true;
      _isFirstLogin = action.payload.isFirstLogin;
      FacebookStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isAuthCompleted = false;
      _isFirstLogin = false;
      // FacebookStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = FacebookStore;