import { EventEmitter } from 'events';
import assign from 'object-assign';
import CreateProfileConstants from '../constants/CreateProfileConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

var CHANGE_EVENT = 'change';
var _isWorking = false;

var CreateProfileStore = assign({}, EventEmitter.prototype, {
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
  }
});

CreateProfileStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case CreateProfileConstants.CREATE_PROFILE_INTENT:
      _isWorking = true;
      CreateProfileStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = CreateProfileStore;