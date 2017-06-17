import { EventEmitter } from 'events';
import EditMatchConstants from '../constants/EditMatchConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isMatchConfirmed = false;
let _isSavingMatch = false;
let _errorSavingMatch = null;
let _isMatchSaved = false;

let EditMatchStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isMatchConfirmed() {
    return _isMatchConfirmed;
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

EditMatchStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case EditMatchConstants.CONFIRM:
      _isMatchConfirmed = true;
      EditMatchStore.emitChange();
      break;

    case EditMatchConstants.MATCH_SAVED:
      _isSavingMatch = false;
      _errorSavingMatch = null;
      _isMatchSaved = true;
      _isMatchConfirmed = false;
      EditMatchStore.emitChange();
      break;

    case EditMatchConstants.SAVING_MATCH:
      _isSavingMatch = true;
      _errorSavingMatch = null;
      _isMatchSaved = false;
      _isMatchConfirmed = false;
      EditMatchStore.emitChange();
      break;

    case EditMatchConstants.ERROR_SAVING_MATCH:
      _isSavingMatch = false;
      _errorSavingMatch = action.payload.message;
      _isMatchConfirmed = false;
      _isMatchSaved = false;
      EditMatchStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isMatchConfirmed = false;
      _isSavingMatch = false;
      _errorSavingMatch = null;
      _isMatchSaved = false;
      break;

    default:
      break;
  }
});

module.exports = EditMatchStore;