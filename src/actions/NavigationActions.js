import NavigationConstants from '../constants/NavigationConstants';
import Dispatcher from '../dispatcher/Dispatcher';

export default class NavigationActions {
  static addRoute(route) {
    Dispatcher.handleViewAction({
      actionType: NavigationConstants.ADD_ROUTE,
      data: route
    });
  }

  static replaceRoute(route) {
    Dispatcher.handleViewAction({
      actionType: NavigationConstants.REPLACE_ROUTE,
      data: route
    });
  }

  static back() {
    Dispatcher.handleViewAction({
      actionType: NavigationConstants.BACK
    });
  }
}