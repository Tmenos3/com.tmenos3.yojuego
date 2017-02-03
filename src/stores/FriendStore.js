import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import FriendConstants from '../constants/FriendConstants';

const CHANGE_EVENT = 'change';
let _isLoadingFriend = false;
let _errorLoadingFriend = null;

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
  },

  getErrorLoadingFriend() {
    return _errorLoadingFriend;
  }
});

FriendStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FriendConstants.LOADING_FRIEND:
      _isLoadingFriend = true;
      _errorLoadingFriend = null;
      FriendStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = FriendStore;