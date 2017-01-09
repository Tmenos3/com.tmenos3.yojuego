import { EventEmitter } from 'events';
import assign from 'object-assign';
import CompleteProfileInfoConstants from '../constants/CompleteProfileInfoConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

var CHANGE_EVENT = 'change';
var _isWorking = false;
var _isProccessCompleted = false;
var _proccessErrorReturn = null;

var CompleteProfileInfoStore = assign({}, EventEmitter.prototype, {
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
  isProccessCompleted: () => {
    return _isProccessCompleted;
  },
  proccessErrorReturn: () => {
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

    default:
      break;
  }
});

module.exports = CompleteProfileInfoStore;