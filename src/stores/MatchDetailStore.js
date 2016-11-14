import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import MatchDetailConstants from '../constants/MatchDetailConstants';

var CHANGE_EVENT = 'change';
var _loadingMatchDetail = false;
var _loadingPlayers = false;
var _match = null;
var _players = null;
var _error = null;
var _sendingComment = false;

var MatchDetailStore = assign({}, EventEmitter.prototype, {
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
  loadingPlayers() {
    return _loadingPlayers;
  },
  getMatch() {
    return _match;
  },
  getPlayers() {
    return _players;
  },
  getError() {
    return _error;
  },
  sendingComment() {
    return _sendingComment;
  },
});

MatchDetailStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case MatchDetailConstants.LOADING_MATCH_DETAIL:
      _loadingMatchDetail = true;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.LOADING_PLAYERS:
      _loadingPlayers = true;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.MATCH_DETAIL_GOT:
      _loadingMatchDetail = false;
      _match = action.payload.match;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.PLAYERS_GOT:
      _loadingPlayers = false;
      _players = action.payload.players;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.TIME_EXPIRED_GETTING_MATCH_DETAIL:
      _loadingMatchDetail = false;
      _error = 'Time to get match detail has expired.';
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.SENDING_COMMENT:
      _sendingComment = true;
      MatchDetailStore.emitChange();
      break;

    case MatchDetailConstants.COMMENT_SENT:
      _sendingComment = false;
      _match = action.payload.match;
      MatchDetailStore.emitChange();
      break;
  }
});

module.exports = MatchDetailStore;
