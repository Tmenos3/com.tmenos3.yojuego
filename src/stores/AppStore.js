import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';

const CHANGE_EVENT = 'change';
let _ready = false;
let _loginDone = false;
let _player = null;

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
  },
  isLoginDone() {
    return _loginDone;
  },
  getPlayer() {
    return _player;
  }
});

AppStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AppConstants.INIT_APP:
      _ready = false;
      _loginDone = false;
      _player = null;
      AppStore.emitChange();
      break;

    case AppConstants.APP_READY:
      _ready = true;
      _loginDone = false;
      _player = null;
      AppStore.emitChange();
      break;

    case AppConstants.LOGIN_DONE:
      _ready = true;
      _loginDone = true;
      _player = action.payload;
      AppStore.emitChange();
      break;
  }
});

module.exports = AppStore;