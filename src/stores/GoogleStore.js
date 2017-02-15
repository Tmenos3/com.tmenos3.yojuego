import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import GoogleConstants from '../constants/GoogleConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isAuthCompleted = false;
let _isFirstLogin = false;

let GoogleStore = assign({}, EventEmitter.prototype, {
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

GoogleStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case GoogleConstants.LOGIN_RESOLVED:
      _isAuthCompleted = true;
      _isFirstLogin = action.payload.isFirstLogin;
      GoogleStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isAuthCompleted = false;
      _isFirstLogin = false;
      // GoogleStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = GoogleStore;