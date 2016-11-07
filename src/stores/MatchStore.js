import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import MatchConstants from '../constants/MatchConstants';

var CHANGE_EVENT = 'change';
var _loadingMatchDetail = false;
var _match = null;
var _error = null;

var MatchStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  loadingMatchDetail() {
    return _loadingMatchDetail;
  },
  getMatch() {
    return _match;
  },
  getError() {
    return _error;
  }
});

MatchStore.dispatchToken = AppDispatcher.register(function (action) {
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

module.exports = MatchStore;
