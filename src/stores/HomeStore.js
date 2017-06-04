import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import assign from 'object-assign';
import HomeConstants from '../constants/HomeConstants';
import CreateMatchConstants from '../constants/CreateMatchConstants'
import AccountConstants from '../constants/AccountConstants'
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';
let _showMenu = false;
let _showCreateMatch = false;
let _showMatchDetail = false;
let _match = null;
let _isLoadingMatches = false;
let _matches = [];
let _errorLoadingMatches = null;
let _loadingFriends = false;
let _errorLoadingFriends = null;
let _friends = [];
let _loadingGroups = false;
let _errorLoadingGroups = null;
let _groups = [];
let _showFriend = false;
let _friendId = null;
let _showGroup = false;
let _groupId = null;
let _loadingFriendshipRequest = false;
let _errorLoadingFriendshipRequest = null;
let _friendshipRequests = [];
let _shouldRefreshFriendshipRequestList = false;
let _isLoggingOut = false;
let _errorLoggingOut = null;
let _logOutDone = false;
let _isLoadingPlayer = false;
let _errorLoadingPlayer = null;
let _player = null;
let _loadingMatchInvitations = false;
let _errorLoadingMatchInvitations = null;
let _matchInvitations = null;
let _showAccount = false;

let HomeStore = assign({}, EventEmitter.prototype, {
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
  },

  mustShowCreateMatch() {
    return _showCreateMatch;
  },

  mustShowMatchDetail() {
    return _showMatchDetail;
  },

  getMatch() {
    return _match;
  },

  isLoadingMatches() {
    return _isLoadingMatches;
  },

  getMatches() {
    return _matches;
  },

  getErrorLoadingMatches() {
    return _errorLoadingMatches;
  },

  isLoadingFriends() {
    return _loadingFriends;
  },

  getFriends() {
    return _friends;
  },

  getErrorLoadingFriends() {
    return _errorLoadingFriends;
  },

  isLoadingGroups() {
    return _loadingGroups;
  },

  getGroups() {
    return _groups;
  },

  getErrorLoadingGroups() {
    return _errorLoadingGroups;
  },

  showFriend() {
    return _showFriend;
  },

  getFriendId() {
    return _friendId;
  },

  showGroup() {
    return _showGroup;
  },

  getGroupId() {
    return _groupId;
  },

  isLoadingFriendshipRequest() {
    return _loadingFriendshipRequest;
  },

  getFriendshipRequests() {
    return _friendshipRequests;
  },

  getErrorLoadingFriendshipRequest() {
    return _errorLoadingFriendshipRequest;
  },

  shouldRefreshFriendshipRequestList() {
    return _shouldRefreshFriendshipRequestList;
  },

  isLoggingOut() {
    return _isLoggingOut;
  },

  getErrorLoggingOut() {
    return _errorLoggingOut;
  },

  logOutDone() {
    return _logOutDone;
  },

  isLoadingPlayer() {
    return _isLoadingPlayer;
  },

  getPlayer() {
    return _player;
  },

  getErrorLoadingPlayer() {
    return _errorLoadingPlayer;
  },

  isLoadingMatchInvitations() {
    return _loadingMatchInvitations;
  },

  getMatchInvitations() {
    return _matchInvitations;
  },

  getErrorLoadingMatchInvitations() {
    return _errorLoadingMatchInvitations;
  },

  mustShowAccount() {
    return _showAccount;
  }
});

HomeStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case HomeConstants.SHOW_HOME_MENU:
      _showMenu = true;
      _showCreateMatch = false;
      _showMatchDetail = false;
      _idMatch = null;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.HIDE_HOME_MENU:
      _showMenu = false;
      _showCreateMatch = false;
      _showMatchDetail = false;
      _idMatch = null;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.CREATE_MATCH:
      _showMenu = false;
      _showCreateMatch = true;
      _showMatchDetail = false;
      _idMatch = null;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.SHOW_MATCH_DETAIL:
      _showMenu = false;
      _showCreateMatch = false;
      _showMatchDetail = true;
      _match = action.payload;
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_MATCHES:
      _isLoadingMatches = true;
      _errorLoadingMatches = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.MATCHES_LOADED:
      _isLoadingMatches = false;
      _errorLoadingMatches = null;
      _matches = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.ERROR_LOADING_MATCHES:
      _isLoadingMatches = false;
      _errorLoadingMatches = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.SHOW_FRIEND:
      _showFriend = true;
      _friendId = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.SHOW_GROUP:
      _showGroup = true;
      _groupId = action.payload.groupId;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_FRIENDS:
      _loadingFriends = true;
      _errorLoadingFriends = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.FRIENDS_LOADED:
      _friends = action.payload;
      _loadingFriends = false;
      _errorLoadingFriends = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_FRIENDS_FAILED:
      _loadingFriends = false;
      _errorLoadingFriends = action.payload.message;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_GROUPS:
      _loadingGroups = true;
      _errorLoadingGroups = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.GROUPS_LOADED:
      _groups = action.payload;
      _loadingGroups = false;
      _errorLoadingGroups = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_GROUPS_FAILED:
      _loadingGroups = false;
      _errorLoadingGroups = action.payload.message;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_FRIENDSHIP_REQUEST:
      _loadingFriendshipRequest = true;
      _errorLoadingFriendshipRequest = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.FRIENDSHIP_REQUEST_LOADED:
      _loadingFriendshipRequest = false;
      _errorLoadingFriendshipRequest = null;
      _friendshipRequests = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_FRIENDSHIP_REQUEST_FAILED:
      _loadingFriendshipRequest = false;
      _errorLoadingFriendshipRequest = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_MATCH_INVITATIONS:
      _loadingMatchInvitations = true;
      _errorLoadingMatchInvitations = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.MATCH_INVITATIONS_LOADED:
      _loadingMatchInvitations = false;
      _errorLoadingMatchInvitations = null;
      _matchInvitations = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_MATCH_INVITATIONS_FAILED:
      _loadingMatchInvitations = false;
      _errorLoadingMatchInvitations = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOGOUT_INTENT:
      _isLoggingOut = true;
      _errorLoggingOut = null;
      _logOutDone = false;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOGOUT_FAILED:
      _isLoggingOut = false;
      _errorLoggingOut = action.payload.message;
      _logOutDone = false;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOGOUT_RESOLVED:
      _isLoggingOut = false;
      _errorLoggingOut = null;
      _logOutDone = true;
      HomeStore.emitChange();
      break;

    case HomeConstants.LOADING_PLAYER:
      _isLoadingPlayer = true;
      _errorLoadingPlayer = null;
      HomeStore.emitChange();
      break;

    case HomeConstants.ERROR_LOADING_PLAYER:
      _isLoadingPlayer = false;
      _errorLoadingPlayer = action.payload.message;
      HomeStore.emitChange();
      break;

    case HomeConstants.PLAYER_LOADED:
      _isLoadingPlayer = false;
      _errorLoadingPlayer = null;
      _player = action.payload;
      HomeStore.emitChange();
      break;

    case HomeConstants.SHOW_ACCOUNT:
      _showAccount = true;
      _player = action.payload
      HomeStore.emitChange();
      break;

    case CreateMatchConstants.CLEAN_CREATE_MATCH:
      _showCreateMatch = false;
      break;

    case AccountConstants.ACCOUNT_SAVED:
      _showAccount = false;
      break;

    case AccountConstants.BACK:
      _showAccount = false;
      _showMenu = false;
      HomeStore.emitChange();
      break;

    case AppConstants.RESET_APP:
      _showMenu = false;
      _showCreateMatch = false;
      _showMatchDetail = false;
      _match = null;
      _isLoadingMatches = false;
      _matches = [];
      _errorLoadingMatches = null;
      _loadingFriends = false;
      _errorLoadingFriends = null;
      _friends = [];
      _loadingGroups = false;
      _errorLoadingGroups = null;
      _groups = [];
      _showFriend = false;
      _friendId = null;
      _showGroup = false;
      _groupId = null;
      _loadingFriendshipRequest = false;
      _errorLoadingFriendshipRequest = null;
      _friendshipRequests = [];
      _shouldRefreshFriendshipRequestList = false;
      _isLoggingOut = false;
      _errorLoggingOut = null;
      _logOutDone = false;
      _isLoadingPlayer = false;
      _errorLoadingPlayer = null;
      _player = null;
      break;

    default:
      break;
  }
});

module.exports = HomeStore;