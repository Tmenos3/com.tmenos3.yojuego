import { EventEmitter } from 'events';
import GroupConstants from '../constants/GroupConstants';
import EditGroupConstants from '../constants/EditGroupConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _isLoadingGroup = false;
let _errorLoadingGroup = null;
let _group = null;
let _editGroup = false;
let _groupToEdit = null;
let _deleteGroup = false;
let _deletingGroup = false;
let _errorDeletingGroup = null;
let _groupDeleted = false;
let _exitGroup = false;
let _exitingGroup = false;
let _errorExitingGroup = null;
let _groupExited = false;

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

  getErrorLoadingGroup() {
    return _errorLoadingGroup;
  },

  getGroup() {
    return _group;
  },

  editGroup() {
    return _editGroup;
  },

  getGroupToEdit() {
    return _groupToEdit;
  },

  isDeletingGroup() {
    return _deletingGroup;
  },

  getErrorDeletingGroup() {
    return _errorDeletingGroup;
  },

  groupDeleted() {
    return _groupDeleted;
  },

  deleteGroup() {
    return _deleteGroup;
  },

  isExitingGroup() {
    return _exitingGroup;
  },

  getErrorExitingGroup() {
    return _errorExitingGroup;
  },

  groupExited() {
    return _groupExited;
  },

  exitGroup() {
    return _exitGroup;
  }
});

GroupStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case GroupConstants.LOADING_GROUP:
      _isLoadingGroup = true;
      _errorLoadingGroup = null;
      _group = null;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_LOADING_GROUP:
      _isLoadingGroup = false;
      _errorLoadingGroup = action.payload.message;
      _group = null;
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_LOADED:
      _isLoadingGroup = false;
      _errorLoadingGroup = null;
      _group = action.payload.group;
      GroupStore.emitChange();
      break;

    case GroupConstants.EDIT_GROUP:
      _editGroup = true;
      _groupToEdit = action.payload.group;
      GroupStore.emitChange();
      break;

    case GroupConstants.EDIT_SHOWN:
      _editGroup = false;
      _groupToEdit = null;
      GroupStore.emitChange();
      break;

    case GroupConstants.DELETE_GROUP:
      _deleteGroup = true;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.CANCEL_DELETE_GROUP:
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.DELETING_GROUP:
      _deleteGroup = false;
      _deletingGroup = true;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_DELETED:
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = true;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_DELETING_GROUP:
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = action.payload.message;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case EditGroupConstants.GROUP_SAVED:
      _group = action.payload.group;
      GroupStore.emitChange();
      break;

    case GroupConstants.EXIT_GROUP:
      _exitGroup = true;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.CANCEL_EXIT_GROUP:
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.EXITING_GROUP:
      _exitGroup = false;
      _exitingGroup = true;
      _errorExitingGroup = null;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_EXITED:
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = true;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_EXITING_GROUP:
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = action.payload.message;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.RESET:
    case AppConstants.RESET_APP:
      _isLoadingGroup = false;
      _errorLoadingGroup = null;
      _group = null;
      _editGroup = false;
      _groupToEdit = null;
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = false;
      break;

    default:
      break;
  }
});

module.exports = GroupStore;