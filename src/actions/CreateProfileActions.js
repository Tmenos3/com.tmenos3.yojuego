var CreateProfileConstants = require('../constants/CreateProfileConstants');
var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var ApiService = require('../services/ApiService');


export default class CreateProfileActions {
  static createProfile(firstName, lastName, nickName) {
    Dispatcher.handleViewAction({
      actionType: CreateProfileConstants.CREATE_PROFILE_INTENT
    });

    // ApiService.signUp(email, password)
    //   .then((resp) => {

    //     Dispatcher.handleViewAction({
    //       actionType: SignUpConstants.SIGNUP_RESOLVED
    //     });
    //   }, (cause) => {
    //     Dispatcher.handleViewAction({
    //       actionType: SignUpConstants.SIGNUP_FAILED,
    //       payload: {
    //         code: cause.code,
    //         message: cause.message
    //       }
    //     });
    //   })
    //   .catch(error => {
    //     Dispatcher.handleViewAction({
    //       actionType: SignUpConstants.SIGNUP_FAILED,
    //       payload: {
    //         code: error.code,
    //         message: error.message
    //       }
    //     });
    //   });
  }
}