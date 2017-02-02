import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import FriendConstants from '../constants/FriendConstants';

const CHANGE_EVENT = 'change';
let _isLoadingFriend = false;

let FriendStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoadingFriend() {
    return _isLoadingFriend;
  }
});

FriendStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FriendConstants.LOADING_FRIEND:
      _isLoadingFriend = true;
      FriendStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = FriendStore;