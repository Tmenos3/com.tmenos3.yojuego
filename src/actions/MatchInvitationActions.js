import MatchInvitationConstants from '../constants/MatchInvitationConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ApiService from '../services/ApiService';
import LocalService from '../services/LocalService';
import HomeActions from '../actions/HomeActions';


export default class MatchInvitationActions {
  static accept(matchInvitation) {
    Dispatcher.handleViewAction({
      actionType: MatchInvitationConstants.ACCEPT_INTENT
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.acceptMatchInvitation(matchInvitation.match._id, token);
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.ACCEPT_RESOLVED
        });

        MatchInvitationActions.markAsRead(matchInvitation._id);
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.ACCEPT_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.ACCEPT_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static reject(matchInvitation) {
    Dispatcher.handleViewAction({
      actionType: MatchInvitationConstants.REJECT_INTENT
    });

    LocalService.getToken()
      .then((token) => {
        ApiService.rejectMatchInvitation(matchInvitation.match._id, token)
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.REJECT_RESOLVED
        });

        MatchInvitationActions.markAsRead(matchInvitation._id);
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.REJECT_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.REJECT_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }

  static markAsRead(id) {
    Dispatcher.handleViewAction({
      actionType: MatchInvitationConstants.MARK_AS_READ_INTENT
    });

    LocalService.getToken()
      .then((token) => {
        return ApiService.markAsReadMatchInvitation(id, token)
      })
      .then((resp) => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.MARK_AS_READ_RESOLVED
        });

        HomeActions.loadMatchInvitations();
      }, (cause) => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.MARK_AS_READ_FAILED,
          payload: {
            code: cause.code,
            message: cause.message
          }
        });
      })
      .catch(error => {
        Dispatcher.handleViewAction({
          actionType: MatchInvitationConstants.MARK_AS_READ_FAILED,
          payload: {
            code: error.code,
            message: error.message
          }
        });
      });
  }
};