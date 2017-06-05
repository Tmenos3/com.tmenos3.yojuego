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
  }
});

GroupStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case GroupConstants.CONFIRM:
      GroupStore.emitChange();
      break;

    case GroupConstants.BACK:
      GroupStore.emitChange();
      break;

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

    case EditGroupConstants.GROUP_SAVED:
      _group = action.payload.group;
      GroupStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isLoadingGroup = false;
      _errorLoadingGroup = null;
      _group = null;
      _editGroup = false;
      _groupToEdit = null;
      break;

    default:
      break;
  }
});

module.exports = GroupStore;