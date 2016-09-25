import ApiService from '../services/ApiService';
import CompletePlayerProfileInfoConstants from '../constants/SessionConstants';
import CompletePlayerProfileInfoStore from '../stores/CompletePlayerProfileInfoStore';
import Dispatcher from '../dispatcher/Dispatcher';

var CompletePlayerProfileInfoActions = {
  setPlayer(nickname, birthday, state, adminState) {
    Dispatcher.handleAction({
      actionType: CompletePlayerProfileInfoConstants.SETTING_PLAYER,
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
  }
};

module.exports = CompletePlayerProfileInfoActions;
