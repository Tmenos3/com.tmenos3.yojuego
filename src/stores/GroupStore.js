import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import GroupConstants from '../constants/GroupConstants';

const CHANGE_EVENT = 'change';
let _isLoadingGroup = false;

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
  }
});

GroupStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case GroupConstants.LOADING_GROUP:
      _isLoadingGroup = true;
      GroupStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = GroupStore;