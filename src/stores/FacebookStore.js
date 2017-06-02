import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import FacebookConstants from '../constants/FacebookConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isAuthCompleted = false;
let _isFirstLogin = false;
let _player = null;

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
  },

  getPlayer() {
    return _player;
  }
});

FacebookStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FacebookConstants.LOGIN_RESOLVED:
      _isAuthCompleted = true;
      _isFirstLogin = action.payload.isFirstLogin;
      _player = action.payload.player;
      FacebookStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isAuthCompleted = false;
      _isFirstLogin = false;
      _player = null;
      break;

    default:
      break;
  }
});

module.exports = FacebookStore;