var NavigationConstants = require('../constants/NavigationConstants');
var Dispatcher = require('../dispatcher/Dispatcher');

var NavigationsActions = {
  addRoute: function (route) {
    Dispatcher.handleViewAction({
      actionType: NavigationConstants.ADD_ROUTE,
      data: route
    });
  },

  replaceRoute: function (route) {
    Dispatcher.handleViewAction({
      actionType: NavigationConstants.REPLACE_ROUTE,
      data: route
    });
  },

  back: function (route) {
    Dispatcher.handleViewAction({
      actionType: NavigationConstants.BACK
    });
  }
}

module.exports = NavigationsActions;