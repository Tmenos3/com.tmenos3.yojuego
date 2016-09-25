import { EventEmitter } from 'events';
import assign from 'object-assign';
import CompletePlayerProfileInfoConstants from '../constants/CompletePlayerProfileInfoConstants';
import Dispatcher from '../dispatcher/Dispatcher';

var CHANGE_EVENT = 'change';
var _player = null;
let _settingPlayer = false;

var CompletePlayerProfileInfoStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  settingPlayer() {
    return _settingPlayer;
  }
});

CompletePlayerProfileInfoStore.dispatchToken = Dispatcher.register(function (action) {
  switch (action.actionType) {

    case CompletePlayerProfileInfoConstants.SETTING_PLAYER:
      _settingPlayer = true;
      CompletePlayerProfileInfoStore.emitChange();
      break;
  }
});

module.exports = CompletePlayerProfileInfoStore;
