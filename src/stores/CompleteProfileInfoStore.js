import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import CompleteProfileInfoConstants from '../constants/CompleteProfileInfoConstants';

const CHANGE_EVENT = 'change';
let _isWorking = false;
let _isProccessCompleted = false;
let _proccessErrorReturn = null;

export default class CompleteProfileInfoStore extends EventEmitter {
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

  static isProccessCompleted() {
    return _isProccessCompleted;
  }

  static proccessErrorReturn() {
    return _proccessErrorReturn;
  }
}

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