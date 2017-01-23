import PlayerTourConstants from '../constants/PlayerTourConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';

export default class PlayerTourActions {
  static tourCompleted() {
    LocalService.tourCompleted();
    
    Dispatcher.handleViewAction({
      actionType: PlayerTourConstants.TOUR_COMPLETED
    });
  }
}