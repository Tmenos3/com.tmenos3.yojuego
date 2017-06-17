import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import MatchDetailConstants from '../constants/MatchDetailConstants';
import EditMatchConstants from '../constants/EditMatchConstants';

const CHANGE_EVENT = 'change';
let _savingMatch = false;
let _errorSavingMatch = null;
let _editMatch = false;
let _match = null;
let _exitMatch = false;
let _exitingMatch = false;
let _errorExitingMatch = null;
let _matchExited = false;
let _cancelMatch = false;
let _cancelingMatch = false;
let _errorCancelingMatch = null;
let _matchCanceled = false;

let MatchDetailStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isSavingMatch() {
    return _savingMatch;
  },

  getErrorSavingMatch() {
    return _errorSavingMatch;
  },

  editMatch() {
    return _editMatch;
  },

  getMatch() {
    return _match;
  },

  exitMatch() {
    return _exitMatch;
  },

  isExitingMatch() {
    return _exitingMatch;
  },

  getErrorExitingMatch() {
    return _errorExitingMatch;
  },

  matchExited() {
    return _matchExited;
  },

  cancelMatch() {
    return _cancelMatch;
  },

  isCancelingMatch() {
    return _cancelingMatch;
  },

  getErrorCancelingMatch() {
    return _errorCancelingMatch;
  },

  matchCanceled() {
    return _matchCanceled;
  },
});

MatchDetailStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case MatchDetailConstants.SET_MATCH:
      _match = action.payload.match;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.MATCH_DETAIL_CONFIRM_INTENT:
      _savingMatch = true;
      _errorSavingMatch = null;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.MATCH_DETAIL_CONFIRM_RESOLVED:
      _savingMatch = false;
      _errorSavingMatch = null;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.MATCH_DETAIL_CONFIRM_REJECTED:
      _savingMatch = false;
      _errorSavingMatch = action.payload;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.EDIT_MATCH:
      _editMatch = true;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.EDIT_SHOWN:
      _editMatch = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.EXIT_MATCH:
      _exitMatch = true;
      _exitingMatch = false;
      _errorExitingMatch = null;
      _matchExited = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.CANCEL_EXIT_MATCH:
      _exitMatch = false;
      _exitingMatch = false;
      _errorExitingMatch = null;
      _matchExited = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.EXITING_MATCH:
      _exitMatch = false;
      _exitingMatch = true;
      _errorExitingMatch = null;
      _matchExited = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.MATCH_EXITED:
      _exitMatch = false;
      _exitingMatch = false;
      _errorExitingMatch = null;
      _matchExited = true;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.ERROR_EXITING_MATCH:
      _exitMatch = false;
      _exitingMatch = false;
      _errorExitingMatch = action.payload.message;
      _matchExited = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.CANCEL_MATCH:
      _cancelMatch = true;
      _cancelingMatch = false;
      _errorCancelingMatch = null;
      _matchCanceled = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.CANCEL_CANCEL_MATCH:
      _cancelMatch = false;
      _cancelingMatch = false;
      _errorCancelingMatch = null;
      _matchCanceled = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.CANCELING_MATCH:
      _cancelMatch = false;
      _cancelingMatch = true;
      _errorCancelingMatch = null;
      _matchCanceled = false;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.MATCH_CANCELED:
      _cancelMatch = false;
      _cancelingMatch = false;
      _errorCancelingMatch = null;
      _matchCanceled = true;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.ERROR_CANCELING_MATCH:
      _cancelMatch = false;
      _cancelingMatch = false;
      _errorCancelingMatch = action.payload.message;
      _matchCanceled = false;
      MatchDetailStore.emitChange();
      break;

    case EditMatchConstants.MATCH_SAVED:
      _match = action.payload.match;
      MatchDetailStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _savingMatch = false;
      _errorSavingMatch = null;
      _editMatch = false;
      _match = null;
      _exitMatch = false;
      _exitingMatch = false;
      _errorExitingMatch = null;
      _matchExited = false;
      _cancelMatch = false;
      _cancelingMatch = false;
      _errorCancelingMatch = null;
      _matchCanceled = false;
      break;

    default:
      break;
  }
});

module.exports = MatchDetailStore;