import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import FriendConstants from '../constants/FriendConstants';

const CHANGE_EVENT = 'change';
let _isLoadingFriend = false;
let _errorLoadingFriend = null;
let _newFriendConfirmed = false;
let _savingNewFriend = false;
let _savingNewFriendError = null;
let _loadingFriends = false;
let _errorLoadingFriends = null;
let _loadingGroups = false;
let _errorLoadingGroups = null;

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

  isSavingNewFriend() {
    return _savingNewFriend;
  },

  getErrorLoadingFriend() {
    return _errorLoadingFriend;
  },

  getErrorSavingNewFriend() {
    return _savingNewFriendError;
  },

  isNewFriendConfirmed() {
    return _newFriendConfirmed;
  }
});

FriendStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case FriendConstants.LOADING_FRIEND:
      _isLoadingFriend = true;
      _errorLoadingFriend = null;
      _newFriendConfirmed = false;
      FriendStore.emitChange();
      break;

    case FriendConstants.NEW_FRIEND_CONFIRMED:
      _newFriendConfirmed = true;
      FriendStore.emitChange();
      break;

    case FriendConstants.SAVING_NEW_FRIEND:
      _savingNewFriend = true;
      _savingNewFriendError = null;
      _newFriendConfirmed = false;
      FriendStore.emitChange();
      break;

    case FriendConstants.NEW_FRIEND_SAVED:
      _savingNewFriend = false;
      _savingNewFriendError = null;
      _newFriendConfirmed = false;
      FriendStore.emitChange();
      break;

    case FriendConstants.SAVING_NEW_FRIEND_FAILED:
      _savingNewFriend = false;
      _savingNewFriendError = action.payload.message;
      _newFriendConfirmed = false;
      FriendStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = FriendStore;