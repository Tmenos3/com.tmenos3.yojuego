import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import PlayerConstants from '../constants/PlayerConstants';

const CHANGE_EVENT = 'change';
let _loadingPlayer = false;
let _creatingPlayer = false;
let _player = null;

export default class PlayerStore extends EventEmitter {
  static emitChange() {
    this.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  static loadingPlayer() {
    return _loadingPlayer;
  }

  static creatingPlayer() {
    return _creatingPlayer;
  }

  static getPlayer() {
    return _player;
  }
}

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