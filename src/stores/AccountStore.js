import { EventEmitter } from 'events';
import AccountConstants from '../constants/AccountConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isAccountChangesConfirmed = false;
let _isSaving = false;
let _errorSaving = null;
let _isAccountSaved = false;

let AccountStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isAccountChangesConfirmed() {
    return _isAccountChangesConfirmed;
  },

  isSaving() {
    return _isSaving;
  },

  isAccountSaved() {
    return _isAccountSaved;
  },

  getErrorSaving() {
    return _errorSaving;
  },
});

AccountStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AccountConstants.CONFIRM_SAVE:
      _isAccountChangesConfirmed = true;
      AccountStore.emitChange();
      break;

    case AccountConstants.SAVING:
      _isSaving = true;
      _isAccountChangesConfirmed = false;
      AccountStore.emitChange();
      break;

    case AccountConstants.ERROR_SAVING:
      _isSaving = false;
      _errorSaving = action.payload.message;
      _isAccountChangesConfirmed = false;
      _isAccountSaved = false;
      AccountStore.emitChange();
      break;

    case AccountConstants.ACCOUNT_SAVED:
      _isSaving = false;
      _errorSaving = null;
      _isAccountSaved = true;
      _isAccountChangesConfirmed = false;
      AccountStore.emitChange();
      break;

    // case CreateMatchConstants.CLEAN_CREATE_MATCH:
    // case AppConstants.RESET_APP:
    //   _friends = [];
    //   _isGettingFriends = false;
    //   _errorGettingFriends = null;
    //   _isNewMatchConfirmed = false;
    //   _isSavingMatch = false;
    //   _errorSavingMatch = null;
    //   _isMatchSaved = false;
    //   break;

    default:
      break;
  }
});

module.exports = AccountStore;