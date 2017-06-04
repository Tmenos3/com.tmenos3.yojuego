import { EventEmitter } from 'events';
import NewGroupConstants from '../constants/NewGroupConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _friends = [];
let _isGettingFriends = false;
let _errorGettingFriends = null;
let _isNewGroupConfirmed = false;
let _isSavingGroup = false;
let _errorSavingGroup = null;
let _isGroupSaved = false;

let NewGroupStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getFriends() {
    return _friends;
  },

  isGettingFriends() {
    return _isGettingFriends;
  },

  getErrorGettingFriends() {
    return _errorGettingFriends;
  },

  isNewGroupConfirmed() {
    return _isNewGroupConfirmed;
  },

  isSavingGroup() {
    return _isSavingGroup;
  },

  getErrorSavingGroup() {
    return _errorSavingGroup;
  },

  isGroupSaved() {
    return _isGroupSaved;
  }
});

NewGroupStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case NewGroupConstants.CONFIRM:
      _isNewGroupConfirmed = true;
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.BACK:
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.NEW_GROUP:
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.FRIENDS_LOADED:
      _isGettingFriends = false;
      _errorGettingFriends = null;
      _friends = action.payload;
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.LOADING_FRIENDS:
      _isGettingFriends = true;
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.ERROR_LOADING_FRIENDS:
      _isGettingFriends = false;
      _errorGettingFriends = action.payload.message;
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.GROUP_SAVED:
      _isSavingGroup = false;
      _errorSavingGroup = null;
      _isGroupSaved = true;
      _isNewGroupConfirmed = false;
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.SAVING_GROUP:
      _isSavingGroup = true;
      _errorSavingGroup = null;
      _isGroupSaved = false;
      _isNewGroupConfirmed = false;
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.ERROR_SAVING_GROUP:
      _isSavingGroup = false;
      _errorSavingGroup = action.payload.message;
      _isNewGroupConfirmed = false;
      _isGroupSaved = false;
      NewGroupStore.emitChange();
      break;

    case NewGroupConstants.CLEAN_NEW_GROUP:
    case AppConstants.RESET_APP:
      _friends = [];
      _isGettingFriends = false;
      _errorGettingFriends = null;
      _isNewGroupConfirmed = false;
      _isSavingGroup = false;
      _errorSavingGroup = null;
      _isGroupSaved = false;
      break;

    default:
      break;
  }
});

module.exports = NewGroupStore;