import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import MatchDetailConstants from '../constants/MatchDetailConstants';

const CHANGE_EVENT = 'change';
let _savingMatch = false;
let _errorSavingMatch = null;

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
  }
});

MatchDetailStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
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

    case AppConstants.RESET_APP:
      _savingMatch = false;
      _errorSavingMatch = null;
      // MatchDetailStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = MatchDetailStore;