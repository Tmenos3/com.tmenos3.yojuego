import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import CompleteProfileInfoConstants from '../constants/CompleteProfileInfoConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isWorking = false;
let _isProccessCompleted = false;
let _proccessErrorReturn = null;

let CompleteProfileInfoStore = assign({}, EventEmitter.prototype, {
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

  isProccessCompleted() {
    return _isProccessCompleted;
  },

  proccessErrorReturn() {
    return _proccessErrorReturn;
  }
});

CompleteProfileInfoStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_INTENT:
      _isWorking = true;
      _isProccessCompleted = false;
      _proccessErrorReturn = null;
      CompleteProfileInfoStore.emitChange();
      break;

    case CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_RESOLVED:
      _isWorking = false;
      _isProccessCompleted = true;
      _proccessErrorReturn = null;
      CompleteProfileInfoStore.emitChange();
      break;

    case CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_FAILED:
      _isWorking = false;
      _isProccessCompleted = true;
      _proccessErrorReturn = action.payload.message;
      CompleteProfileInfoStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isWorking = false;
      _isProccessCompleted = false;
      _proccessErrorReturn = null;
      // CompleteProfileInfoStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = CompleteProfileInfoStore;