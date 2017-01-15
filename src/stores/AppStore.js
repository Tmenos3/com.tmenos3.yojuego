import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';

const CHANGE_EVENT = 'change';
let _ready = false;

let AppStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  ready() {
    return _ready;
  }
});

AppStore.dispatchToken = AppDispatcher.register((action) => {
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