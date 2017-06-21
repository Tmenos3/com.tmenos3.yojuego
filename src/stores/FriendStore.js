import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import FriendConstants from '../constants/FriendConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _newFriendConfirmed = false;
let _savingNewFriend = false;
let _savingNewFriendError = null;
let _loadingFriends = false;
let _errorLoadingFriends = null;
let _isDeletingFriend = false;
let _friendDeleted = false;
let _errorDeletingFriend = null;

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

  isSavingNewFriend() {
    return _savingNewFriend;
  },

  getErrorSavingNewFriend() {
    return _savingNewFriendError;
  },

  isNewFriendConfirmed() {
    return _newFriendConfirmed;
  },

  isDeletingFriend() {
    return _isDeletingFriend;
  },

  getErrorDeletingFriend() {
    return _errorDeletingFriend;
  },

  friendDeleted() {
    return _friendDeleted;
  },
});

FriendStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
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

    case FriendConstants.DELETING_FRIEND:
      _isDeletingFriend = true;
      _friendDeleted = false;
      _errorDeletingFriend = null;
      FriendStore.emitChange();
      break;

    case FriendConstants.FRIEND_DELETED:
      _isDeletingFriend = false;
      _friendDeleted = true;
      _errorDeletingFriend = null;
      FriendStore.emitChange();
      break;

    case FriendConstants.ERROR_DELETING_FRIEND:
      _isDeletingFriend = false;
      _friendDeleted = false;
      _errorDeletingFriend = action.payload.message;
      FriendStore.emitChange();
      break;

    case FriendConstants.RESET:
    case AppConstants.RESET_APP:
      _newFriendConfirmed = false;
      _savingNewFriend = false;
      _savingNewFriendError = null;
      _loadingFriends = false;
      _errorLoadingFriends = null;
      _isDeletingFriend = false;
      _friendDeleted = false;
      _errorDeletingFriend = null;
      break;

    default:
      break;
  }
});

module.exports = FriendStore;