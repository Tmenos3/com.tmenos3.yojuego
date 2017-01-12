import Flux, { Dispatcher } from 'flux';
import Queue from 'sync-queue';
import LogHelper from '../services/LogHelper';
import assign from 'object-assign';
let queue = new Queue();

let AppDispatcher = assign(new Dispatcher(), {
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