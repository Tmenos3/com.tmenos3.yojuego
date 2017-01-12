import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';

const CHANGE_EVENT = 'change';
let _ready = false;

export default class AppStore extends EventEmitter {
  static emitChange() {
    this.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  static ready() {
    return _ready;
  }
}

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