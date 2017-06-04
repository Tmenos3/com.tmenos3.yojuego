import { EventEmitter } from 'events';
import GroupConstants from '../constants/GroupConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

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

    case AppConstants.RESET_APP:
      break;

    default:
      break;
  }
});

module.exports = GroupStore;