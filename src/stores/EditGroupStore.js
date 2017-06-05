import { EventEmitter } from 'events';
import EditGroupConstants from '../constants/EditGroupConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isGroupConfirmed = false;
let _isSavingGroup = false;
let _errorSavingGroup = null;
let _isGroupSaved = false;

let EditGroupStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isGroupConfirmed() {
    return _isGroupConfirmed;
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

EditGroupStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case EditGroupConstants.CONFIRM:
      _isGroupConfirmed = true;
      EditGroupStore.emitChange();
      break;

    case EditGroupConstants.GROUP_SAVED:
      _isSavingGroup = false;
      _errorSavingGroup = null;
      _isGroupSaved = true;
      _isGroupConfirmed = false;
      EditGroupStore.emitChange();
      break;

    case EditGroupConstants.SAVING_GROUP:
      _isSavingGroup = true;
      _errorSavingGroup = null;
      _isGroupSaved = false;
      _isGroupConfirmed = false;
      EditGroupStore.emitChange();
      break;

    case EditGroupConstants.ERROR_SAVING_GROUP:
      _isSavingGroup = false;
      _errorSavingGroup = action.payload.message;
      _isGroupConfirmed = false;
      _isGroupSaved = false;
      EditGroupStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isGroupConfirmed = false;
      _isSavingGroup = false;
      _errorSavingGroup = null;
      _isGroupSaved = false;
      break;

    default:
      break;
  }
});

module.exports = EditGroupStore;