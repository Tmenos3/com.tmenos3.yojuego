import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import NavigationConstants from '../constants/NavigationConstants';

const CHANGE_EVENT = 'change';
let _currentRoute = { id: null, data: null };
let _currentAction;

let NavigationStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentRoute() {
    return _currentRoute;
  },

  getCurrentAction() {
    return _currentAction;
  }
});

NavigationStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {

    case NavigationConstants.ADD_ROUTE:
      _currentRoute.id = action.data.id;
      _currentRoute.data = action.data.data;
      _currentAction = NavigationConstants.ADD_ROUTE;
      NavigationStore.emitChange();
      break;

    case NavigationConstants.REPLACE_ROUTE:
      _currentRoute.id = action.data.id;
      _currentRoute.data = action.data.data;
      _currentAction = NavigationConstants.REPLACE_ROUTE;
      NavigationStore.emitChange();
      break;

    case NavigationConstants.RESET_TO_ROUTE:
      _currentRoute.id = action.data.id;
      _currentRoute.data = action.data.data;
      _currentAction = NavigationConstants.RESET_TO_ROUTE;
      NavigationStore.emitChange();
      break;

    case NavigationConstants.BACK:
      _currentAction = NavigationConstants.BACK;
      NavigationStore.emitChange();
      break;
  }
});

module.exports = NavigationStore;