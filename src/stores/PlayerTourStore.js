import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import PlayerTourConstants from '../constants/PlayerTourConstants';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _isTourCompleted = false;

let PlayerTourStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isTourCompleted() {
    return _isTourCompleted;
  }
});

PlayerTourStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case PlayerTourConstants.TOUR_COMPLETED:
      _isTourCompleted = true;
      PlayerTourStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _isTourCompleted = false;
      // PlayerTourStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = PlayerTourStore;