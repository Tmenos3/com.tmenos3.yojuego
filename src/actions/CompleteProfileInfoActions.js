import CompleteProfileInfoConstants from '../constants/CompleteProfileInfoConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';

export default class CompleteProfileInfoActions {
  static completeProfileInfo(firstName, lastName, nickName) {
    Dispatcher.handleViewAction({
      actionType: CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_INTENT
    });

    ApiService.completeProfileInfo(firstName, lastName, nickName, LocalService.getToken())
      .then((resp) => {
        LocalService.savePlayer(resp.resp);
        LocalService.firstLoginDone();

        Dispatcher.handleViewAction({
          actionType: CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_RESOLVED
        });
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
}