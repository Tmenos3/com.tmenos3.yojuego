import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import MatchDetailConstants from '../constants/MatchDetailConstants';
import Dispatcher from '../dispatcher/Dispatcher';

export default class MatchDetailActions {
  static back() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.BACK
    });
  }

  static confirm() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.MATCH_DETAIL_CONFIRM_INTENT
    });
  }

  static edit() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EDIT_MATCH
    });
  }

  static editShown() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EDIT_SHOWN
    });
  }

  static setMatch(match) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.SET_MATCH,
      payload: {
        match
      }
    });
  }

  static reset() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.RESET
    });
  }

  static exit() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EXIT_MATCH
    });
  }

  static cancel() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCEL_MATCH
    });
  }

  static cancelExitMatch() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCEL_EXIT_MATCH
    });
  }

  static cancelCancelMatch() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCEL_CANCEL_MATCH
    });
  }

  static cancelMatchConfirmed(matchId) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCELING_MATCH
    });

    let matchSaved = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.cancelMatch(matchId, token);
      })
      .then((resp) => {
        matchSaved = resp.resp;
        return LocalService.updateMatch(resp.resp);
      })
      .then((matches) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.MATCH_CANCELED,
          payload: {
            match: matchSaved
          }
        });

        HomeActions.loadMatches(matches);
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_CANCELING_MATCH,
          payload: {
            message: error.message
          }
        });
      });
  }

  static exitMatchConfirmed(matchId) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.EXITING_MATCH
    });

    let matchSaved = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.exitMatch(matchId, token);
      })
      .then((resp) => {
        matchSaved = resp.resp;
        return LocalService.updateMatch(resp.resp);
      })
      .then((matches) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.MATCH_EXITED,
          payload: {
            match: matchSaved
          }
        });

        HomeActions.loadMatches(matches);
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_EXITING_MATCH,
          payload: {
            message: error.message
          }
        });
      });
  }

  static loadFriendsAndGroups() {
    MatchDetailActions.loadFriends();
    MatchDetailActions.loadGroups();
  }

  static loadFriends() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.LOADING_FRIENDS
    });

    LocalService.getFriends()
      .then((friends) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.FRIENDS_LOADED,
          payload: {
            friends
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_LOADING_FRIENDS,
          payload: {
            message: error.message
          }
        });
      });
  }

  static loadGroups() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.LOADING_GROUPS
    });

    LocalService.getGroups()
      .then((groups) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.GROUPS_LOADED,
          payload: {
            groups
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_LOADING_GROUPS,
          payload: {
            message: error.message
          }
        });
      });
  }

  static invite(match, friends, groups) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.SAVING_MATCH
    });

    let matchSaved = null;
    LocalService.getToken()
      .then((token) => {
        let players = [].concat.apply([], groups.map((g) => { return g.players.map(p => { return p._id; }); })).concat(friends.map((f) => { return f.friendId }));
        let list = Array.from(new Set(players)); //removes duplicates
        return ApiService.invitePlayersToMatch(match._id, list, token);
      })
      .then((resp) => {
        matchSaved = resp.resp;
        return LocalService.updateMatch(resp.resp);
      })
      .then((matches) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.MATCH_SAVED,
          payload: {
            match: matchSaved
          }
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_SAVING_MATCH,
          payload: cause.message
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_SAVING_MATCH,
          payload: error.message
        });
      });
  }

  static removePlayer(player) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.REMOVE_PLAYER,
      payload: {
        player
      }
    });
  }

  static cancelRemovePlayer() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.CANCEL_REMOVE_PLAYER
    });
  }

  static removePlayerConfirmed(matchId, playerId) {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.REMOVING_PLAYER
    });

    let match = null;
    LocalService.getToken()
      .then((token) => {
        return ApiService.removePlayerFromGroup(matchId, playerId, token);
      })
      .then((resp) => {
        match = resp.resp;
        return LocalService.updateMatch(match);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.PLAYER_REMOVED,
          payload: {
            match
          }
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: MatchDetailConstants.ERROR_REMOVING_PLAYER,
          payload: {
            message: error.message
          }
        });
      });
  }
};