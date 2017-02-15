import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import GroupConstants from '../constants/GroupConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isLoadingGroup = false;
let _errorLoadingGroup = null;
let _newGroupConfirmed = false;
let _savingNewGroup = false;
let _savingNewGroupError = null;
let _loadingGroups = false;
let _errorLoadingGroups = null;

let GroupStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoadingGroup() {
    return _isLoadingGroup;
  },

  isSavingNewGroup() {
    return _savingNewGroup;
  },

  getErrorLoadingGroup() {
    return _errorLoadingGroup;
  },

  getErrorSavingNewGroup() {
    return _savingNewGroupError;
  },

  isNewGroupConfirmed() {
    return _newGroupConfirmed;
  }
});

GroupStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case GroupConstants.LOADING_GROUP:
      _isLoadingGroup = true;
      _errorLoadingGroup = null;
      _newGroupConfirmed = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.NEW_GROUP_CONFIRMED:
      _newGroupConfirmed = true;
      GroupStore.emitChange();
      break;

    case GroupConstants.SAVING_NEW_GROUP:
      _savingNewGroup = true;
      _savingNewGroupError = null;
      _newGroupConfirmed = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.NEW_GROUP_SAVED:
      _savingNewGroup = false;
      _savingNewGroupError = null;
      _newGroupConfirmed = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.SAVING_NEW_GROUP_FAILED:
      _savingNewGroup = false;
      _savingNewGroupError = action.payload.message;
      _newGroupConfirmed = false;
      GroupStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isLoadingGroup = false;
      _errorLoadingGroup = null;
      _newGroupConfirmed = false;
      _savingNewGroup = false;
      _savingNewGroupError = null;
      _loadingGroups = false;
      _errorLoadingGroups = null;
      // GroupStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = GroupStore;