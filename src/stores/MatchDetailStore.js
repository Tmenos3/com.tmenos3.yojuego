import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import MatchDetailConstants from '../constants/MatchDetailConstants';

const CHANGE_EVENT = 'change';
let _loadingMatchDetail = false;
let _loadingPlayers = false;
let _match = null;
let _players = null;
let _error = null;
let _sendingComment = false;

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
  }
});

MatchDetailStore.dispatchToken = AppDispatcher.register((action) => {
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