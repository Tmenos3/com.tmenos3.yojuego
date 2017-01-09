var AppConstants = require('../constants/AppConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
// var LogHelper = require('../utilities/LogHelper');

var AppActions = {
  initializeApp: function () {
    Dispatcher.handleViewAction({
      actionType: AppConstants.INIT_APP
    });

    setTimeout(() => {
      Dispatcher.handleViewAction({
        actionType: AppConstants.APP_READY
      });
    }, 3000);
  }
}

module.exports = AppActions;