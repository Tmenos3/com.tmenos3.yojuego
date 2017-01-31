// import ApiService from '../services/ApiService';
import MatchDetailConstants from '../constants/MatchDetailConstants';
import Dispatcher from '../dispatcher/Dispatcher';

export default class MatchDetailActions {
  static showMenu() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.SHOW_MATCH_DETAIL_MENU
    });
  }

  static hideMenu() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.HIDE_MATCH_DETAIL_MENU
    });
  }
};