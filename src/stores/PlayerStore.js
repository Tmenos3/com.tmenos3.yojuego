import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import PlayerConstants from '../constants/PlayerConstants';

var CHANGE_EVENT = 'change';
var _loadingPlayer = false;
var _creatingPlayer = false;
var _player = null;

var PlayerStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  loadingPlayer() {
    return _loadingPlayer;
  },
  creatingPlayer() {
    return _creatinigPlayer;
  },
  getPlayer() {
    return _player;
  }
});

PlayerStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case PlayerConstants.SET_PLAYER:
      _loadingPlayer = false;
      _creatingPlayer = false;
      _player = action.payload;
      PlayerStore.emitChange();
      break;

    case PlayerConstants.GET_PLAYER:
      _loadingPlayer = true;
      PlayerStore.emitChange();
      break;
  }
});

module.exports = PlayerStore;
