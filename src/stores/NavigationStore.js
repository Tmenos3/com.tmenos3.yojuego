var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/Dispatcher');
var NavigationConstants = require('../constants/NavigationConstants');
var _currentRoute = {id: null, data: null};
var CHANGE_EVENT = 'change';

var NavigationStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getCurrentRoute: function(){
    return _currentRoute;
  },
});

NavigationStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case NavigationConstants.ADD_ROUTE:
    _currentRoute.id = action.data.id;
    _currentRoute.data = action.data.data;
    NavigationStore.emitChange();
    break;
  }
});

module.exports = NavigationStore;
