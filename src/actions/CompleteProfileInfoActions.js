import CompleteProfileInfoConstants from '../constants/CompleteProfileInfoConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';

export default class CompleteProfileInfoActions {
  static completeProfileInfo(firstName, lastName, nickName) {
    Dispatcher.handleViewAction({
      actionType: CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_INTENT
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.completeProfileInfo(firstName, lastName, nickName, token);
      })
      .then((resp) => {
        return LocalService.savePlayer(resp.resp);
      })
      .then(() => {
        return LocalService.firstLoginDone();
      })
      .then(() => {
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
      });;
  }
}