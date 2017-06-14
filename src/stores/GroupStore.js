import { EventEmitter } from 'events';
import GroupConstants from '../constants/GroupConstants';
import EditGroupConstants from '../constants/EditGroupConstants';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/Dispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _isLoadingGroup = false;
let _errorLoadingGroup = null;
let _group = null;
let _editGroup = false;
let _groupToEdit = null;
let _deleteGroup = false;
let _deletingGroup = false;
let _errorDeletingGroup = null;
let _groupDeleted = false;
let _exitGroup = false;
let _exitingGroup = false;
let _errorExitingGroup = null;
let _groupExited = false;
let _isAddingPlayers = false;
let _playersAdded = false;
let _errorAddingPlayers = null;
let _back = false;
let _removePlayer = false;
let _removingPlayer = false;
let _errorRemovingPlayer = null;
let _playerRemoved = false;
let _makeAdminPlayer = false;
let _makingAdminPlayer = false;
let _errorMakingAdminPlayer = null;
let _playerMadeAdmin = false;

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
  },

  editGroup() {
    return _editGroup;
  },

  getGroupToEdit() {
    return _groupToEdit;
  },

  isDeletingGroup() {
    return _deletingGroup;
  },

  getErrorDeletingGroup() {
    return _errorDeletingGroup;
  },

  groupDeleted() {
    return _groupDeleted;
  },

  deleteGroup() {
    return _deleteGroup;
  },

  isExitingGroup() {
    return _exitingGroup;
  },

  getErrorExitingGroup() {
    return _errorExitingGroup;
  },

  groupExited() {
    return _groupExited;
  },

  exitGroup() {
    return _exitGroup;
  },

  isAddingPlayers() {
    return _isAddingPlayers;
  },

  playersAdded() {
    return _playersAdded;
  },

  getErrorAddingPlayers() {
    return _errorAddingPlayers;
  },

  backPressed() {
    let ret = _back;
    _back = false;
    return ret;
  },

  removePlayer() {
    return _removePlayer;
  },

  isRemovingPlayer() {
    return _removingPlayer;
  },

  getErrorRemovingPlayer() {
    return _errorRemovingPlayer;
  },

  playerRemoved() {
    return _playerRemoved;
  },

  makeAdminPlayer() {
    return _makeAdminPlayer;
  },

  isMakingAdminPlayer() {
    return _makingAdminPlayer;
  },

  getErrorMakingAdminPlayer() {
    return _errorMakingAdminPlayer;
  },

  playerMadeAdmin() {
    return _playerMadeAdmin;
  },
});

GroupStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case GroupConstants.BACK:
      _back = true;
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

    case GroupConstants.EDIT_GROUP:
      _editGroup = true;
      _groupToEdit = action.payload.group;
      GroupStore.emitChange();
      break;

    case GroupConstants.EDIT_SHOWN:
      _editGroup = false;
      _groupToEdit = null;
      GroupStore.emitChange();
      break;

    case GroupConstants.DELETE_GROUP:
      _deleteGroup = true;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.CANCEL_DELETE_GROUP:
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.DELETING_GROUP:
      _deleteGroup = false;
      _deletingGroup = true;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_DELETED:
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = true;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_DELETING_GROUP:
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = action.payload.message;
      _groupDeleted = false;
      GroupStore.emitChange();
      break;

    case EditGroupConstants.GROUP_SAVED:
      _group = action.payload.group;
      GroupStore.emitChange();
      break;

    case GroupConstants.EXIT_GROUP:
      _exitGroup = true;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.CANCEL_EXIT_GROUP:
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.EXITING_GROUP:
      _exitGroup = false;
      _exitingGroup = true;
      _errorExitingGroup = null;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.GROUP_EXITED:
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = true;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_EXITING_GROUP:
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = action.payload.message;
      _groupExited = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.ADDING_PLAYERS:
      _isAddingPlayers = true;
      _playersAdded = false;
      _errorAddingPlayers = null;
      GroupStore.emitChange();
      break;

    case GroupConstants.PLAYERS_ADDED:
      _isAddingPlayers = false;
      _playersAdded = true;
      _group = action.payload.group;
      _errorAddingPlayers = null;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_ADDING_PLAYERS:
      _isAddingPlayers = false;
      _playersAdded = false;
      _errorAddingPlayers = action.payload.message;
      GroupStore.emitChange();
      break;

    case GroupConstants.RESET_ADD_PLAYERS:
      _playersAdded = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.REMOVE_PLAYER:
      _removePlayer = true;
      _removingPlayer = false;
      _errorRemovingPlayer = null;
      _playerRemoved = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.CANCEL_REMOVE_PLAYER:
      _removePlayer = false;
      _removingPlayer = false;
      _errorRemovingPlayer = null;
      _playerRemoved = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.REMOVING_PLAYER:
      _removePlayer = false;
      _removingPlayer = true;
      _errorRemovingPlayer = null;
      _playerRemoved = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.PLAYER_REMOVED:
      _removePlayer = false;
      _removingPlayer = false;
      _errorRemovingPlayer = null;
      _playerRemoved = true;
      _group = action.payload.group;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_REMOVING_PLAYER:
      _removePlayer = false;
      _removingPlayer = false;
      _errorRemovingPlayer = action.payload.message;
      _playerRemoved = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.RESET_REMOVE_PLAYER:
      _playerRemoved = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.MAKE_PLAYER_ADMIN:
      _makeAdminPlayer = true;
      _makingAdminPlayer = false;
      _errorMakingAdminPlayer = null;
      _playerMadeAdmin = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.CANCEL_MAKE_PLAYER_ADMIN:
      _makeAdminPlayer = false;
      _makingAdminPlayer = false;
      _errorMakingAdminPlayer = null;
      _playerMadeAdmin = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.MAKING_PLAYER_ADMIN:
      _makeAdminPlayer = false;
      _makingAdminPlayer = true;
      _errorMakingAdminPlayer = null;
      _playerMadeAdmin = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.PLAYER_MADE_ADMIN:
      _makeAdminPlayer = false;
      _makingAdminPlayer = false;
      _errorMakingAdminPlayer = null;
      _playerMadeAdmin = true;
      _group = action.payload.group;
      GroupStore.emitChange();
      break;

    case GroupConstants.ERROR_MAKING_PLAYER_ADMIN:
      _makeAdminPlayer = false;
      _makingAdminPlayer = false;
      _errorMakingAdminPlayer = action.payload.message;
      _playerMadeAdmin = false;
      GroupStore.emitChange();
      break;

    case GroupConstants.RESET_REMOVE_PLAYER:
      _playerMadeAdmin = false;
      GroupStore.emitChange();

    case GroupConstants.RESET:
    case AppConstants.RESET_APP:
      _isLoadingGroup = false;
      _errorLoadingGroup = null;
      _group = null;
      _editGroup = false;
      _groupToEdit = null;
      _deleteGroup = false;
      _deletingGroup = false;
      _errorDeletingGroup = null;
      _groupDeleted = false;
      _exitGroup = false;
      _exitingGroup = false;
      _errorExitingGroup = null;
      _groupExited = false;
      _isAddingPlayers = false;
      _playersAdded = false;
      _errorAddingPlayers = null;
      _back = false;
      _removePlayer = false;
      _removingPlayer = false;
      _errorRemovingPlayer = null;
      _playerRemoved = false;
      _makeAdminPlayer = false;
      _makingAdminPlayer = false;
      _errorMakingAdminPlayer = null;
      _playerMadeAdmin = false;
      break;

    default:
      break;
  }
});

module.exports = GroupStore;