import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import MatchDetailConstants from '../constants/MatchDetailConstants';

const CHANGE_EVENT = 'change';
let _showMenu = false;

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

  mustShowMenu() {
    return _showMenu;
  }
});

MatchDetailStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case MatchDetailConstants.SHOW_HOME_MENU:
      _showMenu = true;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.HIDE_HOME_MENU:
      _showMenu = false;
      MatchDetailStore.emitChange();
      break;
  }
});

//module.exports = MatchDetailStore;