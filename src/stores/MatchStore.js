import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import MatchConstants from '../constants/MatchConstants';

const CHANGE_EVENT = 'change';
let _loadingMatchDetail = false;
let _match = null;
let _error = null;

export default class MatchStore extends EventEmitter {
  static emitChange() {
    this.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback) {
    return this.on(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  static loadingMatchDetail() {
    return _loadingMatchDetail;
  }

  static getMatch() {
    return _match;
  }

  static getError() {
    return _error;
  }
}

MatchStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case MatchConstants.GET_MATCH_DETAIL:
      _loadingMatchDetail = true;
      MatchStore.emitChange();
      break;

    case MatchConstants.MATCH_DETAIL_GOT:
      _loadingMatchDetail = false;
      _match = action.payload.match;
      MatchStore.emitChange();
      break;

    case MatchConstants.ERROR_GETTING_MATCH_DETAIL:
      _loadingMatchDetail = false;
      _match = null;
      _error = action.payload.error;
      MatchStore.emitChange();
      break;
  }
});