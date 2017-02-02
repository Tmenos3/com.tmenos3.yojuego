// import ApiService from '../services/ApiService';
import MatchDetailConstants from '../constants/MatchDetailConstants';
import Dispatcher from '../dispatcher/Dispatcher';

export default class MatchDetailActions {
  static confirm() {
    Dispatcher.handleViewAction({
      actionType: MatchDetailConstants.MATCH_DETAIL_CONFIRM_INTENT
    });
  }
};