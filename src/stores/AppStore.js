var assign = require('object-assign');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var _isInitializing = false;
var _session = null;

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  isInitilizing(){
    return _isInitializing;
  }
});

AppStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case AppConstants.INIT_APP:
    _isInitializing = true;
    AppStore.emitChange();
    break;

    case AppConstants.SET_SESSION:
    _isInitializing = false;
    AppStore.emitChange();
    break;
  }
});

module.exports = AppStore;
