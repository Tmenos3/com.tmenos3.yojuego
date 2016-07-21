var assign = require('object-assign');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _appToken = '';
var _opacity = 1;
var _scope = 'com.competir.aula365.mobile';
var _clientId = 'o1rk9uqwr4GW4EKzjdojtnRgWpaoIyO';
var _clientSecret = 'ZjQptLcgHlefbEekrk0cepL4gXWP5DNj6y2CQJVzxWa55snbuXUT0iyJYuaiVBRs';

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
  getAppToken: function() {
    return _appToken;
  },
  getScope: function() {
    return _scope;
  },
  getClientId: function() {
    return _clientId;
  },
  getClientSecret: function() {
    return _clientSecret;
  }

  triggerButtonPressedAction: function() {
    alert('Store: retrieving information');
    return _opacity; //Return the desired opacity
  }
});

AppStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case AppConstants.APP_GET_TOKEN:
    _appToken = '';
    AppStore.emitChange();
    break;

    case AppConstants.APP_SET_TOKEN:
    _appToken = action.payload;
    AppStore.emitChange();
    break;

    case AppConstants.DEMO_BUTTON_PRESSED:
    _opacity = action.payload;
    AppStore.emitChange();
    break;
  }
});

module.exports = AppStore;
