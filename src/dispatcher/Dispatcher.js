var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var Queue = require('sync-queue');
var LogHelper = require('../services/LogHelper');

var queue = new Queue();
var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function (action) {
    action.source = 'VIEW_ACTION';
    LogHelper.log("ACTION (user)", {
      'action': action.actionType,
      'from': action.source
    });
    queue.place(() => {
      this.dispatch(action);
      queue.next();
    });
  },

  handleServerAction: function (action) {
    action.source = 'SERVER_ACTION';
    LogHelper.log("ACTION (server)", {
      'action': action.actionType,
      'from': action.source
    });
    queue.place(() => {
      this.dispatch(action);
      queue.next();
    });
  }
});

module.exports = AppDispatcher;
