import { EventEmitter } from 'events';
import CreateMatchConstants from '../constants/CreateMatchConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _friends = [];
let _isGettingFriends = false;
let _errorGettingFriends = null;
let _isNewMatchConfirmed = false;
let _isSavingMatch = false;
let _errorSavingMatch = null;
let _isMatchSaved = false;

let CreateMatchStore = assign({}, EventEmitter.prototype, {
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

  isNewMatchConfirmed() {
    return _isNewMatchConfirmed;
  },

  isSavingMatch() {
    return _isSavingMatch;
  },

  getErrorSavingMatch() {
    return _errorSavingMatch;
  },

  isMatchSaved() {
    return _isMatchSaved;
  }
});

CreateMatchStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case CreateMatchConstants.CONFIRM:
      _isNewMatchConfirmed = true;
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.BACK:
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.CREATE_MATCH:
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.FRIENDS_LOADED:
      _isGettingFriends = false;
      _errorGettingFriends = null;
      _friends = action.payload;
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.LOADING_FRIENDS:
      _isGettingFriends = true;
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.ERROR_LOADING_FRIENDS:
      _isGettingFriends = false;
      _errorGettingFriends = action.payload.message;
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.MATCH_SAVED:
      _isSavingMatch = false;
      _errorSavingMatch = null;
      _isMatchSaved = true;
      _isNewMatchConfirmed = false;
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.SAVING_MATCH:
      _isSavingMatch = true;
      _errorSavingMatch = null;
      _isMatchSaved = false;
      _isNewMatchConfirmed = false;
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.ERROR_SAVING_MATCH:
      _isSavingMatch = false;
      _errorSavingMatch = action.payload.message;
      _isNewMatchConfirmed = false;
      _isMatchSaved = false;
      CreateMatchStore.emitChange();
      break;

    case CreateMatchConstants.CLEAN_CREATE_MATCH:
    case AppConstants.RESET_APP:
      _friends = [];
      _isGettingFriends = false;
      _errorGettingFriends = null;
      _isNewMatchConfirmed = false;
      _isSavingMatch = false;
      _errorSavingMatch = null;
      _isMatchSaved = false;
      break;

    default:
      break;
  }
});

module.exports = CreateMatchStore;