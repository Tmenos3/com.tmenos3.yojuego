import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import PlayerConstants from '../constants/PlayerConstants';

const CHANGE_EVENT = 'change';
let _loadingPlayer = false;
let _creatingPlayer = false;
let _player = null;

let PlayerStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  loadingPlayer() {
    return _loadingPlayer;
  },

  creatingPlayer() {
    return _creatingPlayer;
  },

  getPlayer() {
    return _player;
  }
});

PlayerStore.dispatchToken = AppDispatcher.register((action) => {
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

    case PlayerConstants.CREATE_PLAYER:
      _loadingPlayer = false;
      _creatingPlayer = true;
      PlayerStore.emitChange();
      break;
  }
});

module.exports = PlayerStore;