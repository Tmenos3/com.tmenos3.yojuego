import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

var CHANGE_EVENT = 'change';
var _ready = false;

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  ready() {
    return _ready;
  }
});

AppStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case AppConstants.INIT_APP:
      _ready = false;
      AppStore.emitChange();
      break;

    case AppConstants.APP_READY:
      _ready = true;
      AppStore.emitChange();
      break;
  }
});

module.exports = AppStore;
