var CompleteProfileInfoConstants = require('../constants/CompleteProfileInfoConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var ApiService = require('../services/ApiService');
var LocalService = require('../services/LocalService');

export default class CompleteProfileInfoActions {
  static completeProfileInfo(firstName, lastName, nickName) {
    Dispatcher.handleViewAction({
      actionType: CompleteProfileInfoConstants.COMPLETE_PROFILE_INFO_INTENT
    });

    ApiService.completeProfileInfo(firstName, lastName, nickName, LocalService.getToken())
      .then((resp) => {
        LocalService.savePlayer(resp.resp);

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