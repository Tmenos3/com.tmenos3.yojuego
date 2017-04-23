import AccountConstants from '../constants/AccountConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import LocalService from '../services/LocalService';
import ApiService from '../services/ApiService';

export default class AccountActions {
  static back() {
    Dispatcher.handleViewAction({
      actionType: AccountConstants.BACK
    });
  }

  static confirmSave() {
    Dispatcher.handleViewAction({
      actionType: AccountConstants.CONFIRM_SAVE
    });
  }

  static save(firstName, lastName, nickName, email, photo, phone) {
    Dispatcher.handleViewAction({
      actionType: AccountConstants.SAVING
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.updateAccount(firstName, lastName, nickName, photo, phone, token)
      })
      .then((resp) => {
        return LocalService.savePlayer(resp.resp);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: AccountConstants.ACCOUNT_SAVED,
          payload: resp
        });
      })
      .catch((error) => {
        Dispatcher.handleViewAction({
          actionType: AccountConstants.ERROR_SAVING,
          payload: error.message
        });
      });;
  }

  static reset() {
    Dispatcher.handleViewAction({
      actionType: AccountConstants.RESET
    });
  }
}