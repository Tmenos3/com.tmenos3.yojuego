var NavigationConstants = require('../constants/NavigationConstants');
var Dispatcher = require('../dispatcher/Dispatcher');

var NavigationsActions = {
  addRoute: function(route) {
    Dispatcher.handleViewAction({
      actionType: NavigationConstants.ADD_ROUTE,
      data: route
    });
  }
}

module.exports = NavigationsActions;
