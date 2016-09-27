import ApiService from '../services/ApiService';
import PlayerConstants from '../constants/SessionConstants';
import PlayerStore from '../stores/PlayerStore';
import Dispatcher from '../dispatcher/Dispatcher';

var PlayerActions = {
  createPlayer(nickname, birthday, state, adminState) {
    Dispatcher.handleServerAction({
      actionType: PlayerConstants.CREATE_PLAYER,
      payload: null
    });

    // ApiService.setPlayerInfo(nickname, birthday, state, adminState, SessionStore.getToken())
    //   .then((player) => {
    //     Dispatcher.handleServerAction({
    //       actionType: SessionConstants.SET_PLAYER,
    //       payload: player
    //     });
    //   }, () => {
    //     Dispatcher.handleServerAction({
    //       actionType: SessionConstants.SET_PLAYER,
    //       payload: null
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },

  getPlayer() {
    Dispatcher.handleServerAction({
      actionType: PlayerConstants.GET_PLAYER,
      payload: player
    });

    ApiService.getPlayerByToken(SessionStore.getToken())
      .then((player) => {
        PlayerActions.setPlayer(player);
      }, (cause) => {
        LogHelper.warning("SessionActions.getPlayer(rejected)", cause);
        PlayerActions.setPlayer(null);
      })
      .catch((error) => {
        LogHelper.error("SessionActions.getPlayer(catch)", error);
      });
  },

  setPlayer(player) {
    Dispatcher.handleServerAction({
      actionType: PlayerConstants.SET_PLAYER,
      payload: player
    });
  }
};

module.exports = PlayerActions;
