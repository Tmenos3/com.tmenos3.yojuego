import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import MatchInvitationConstants from '../constants/MatchInvitationConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isSaving = false;
let _errorSaving = null;

let MatchInvitationStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isSaving() {
    return _isSaving;
  },

  getErrorSaving() {
    return _errorSaving;
  }
});

MatchInvitationStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case MatchInvitationConstants.ACCEPT_INTENT:
      _isSaving = true;
      _errorSaving = null;
      MatchInvitationStore.emitChange();
      break;

    case MatchInvitationConstants.ACCEPT_RESOLVED:
      _isSaving = false;
      _errorSaving = null;
      MatchInvitationStore.emitChange();
      break;

    case MatchInvitationConstants.ACCEPT_FAILED:
      _isSaving = false;
      _errorSaving = action.payload.message;
      MatchInvitationStore.emitChange();
      break;

    case MatchInvitationConstants.REJECT_INTENT:
      _isSaving = true;
      _errorSaving = null;
      MatchInvitationStore.emitChange();
      break;

    case MatchInvitationConstants.REJECT_RESOLVED:
      _isSaving = false;
      _errorSaving = null;
      MatchInvitationStore.emitChange();
      break;

    case MatchInvitationConstants.REJECT_FAILED:
      _isSaving = false;
      _errorSaving = action.payload.message;
      MatchInvitationStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isSaving = false;
      _errorSaving = null;
      break;

    default:
      break;
  }
});

module.exports = MatchInvitationStore;