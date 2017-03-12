import PlayerTourConstants from '../constants/PlayerTourConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';

export default class PlayerTourActions {
  static tourCompleted() {
    Dispatcher.handleViewAction({
      actionType: PlayerTourConstants.ENDING_TOUR
    });

    LocalService.tourCompleted()
      .then(() => {
        LocalService.getPlayer()
          .then((player) => {
            Dispatcher.handleViewAction({
              actionType: PlayerTourConstants.TOUR_COMPLETED,
              payload: player
            });
          })
          .catch((error) => {
            Dispatcher.handleViewAction({
              actionType: PlayerTourConstants.ERROR_ENDING_TOUR
            });
          });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: PlayerTourConstants.ERROR_ENDING_TOUR
        });
      });
  }
}