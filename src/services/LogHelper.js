var logConsole = function (actor, value) {
  let currentdate = new Date();
  let datetime =
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds() + "." +
    currentdate.getMilliseconds() +
    '-';

  var message = value == null ? '' : value.toString() == '[object Object]' ? JSON.stringify(value) : value;
  console.log(datetime + actor + " - " + message);
};

var LocalStorage = {
  log: function (actor, value) {
    logConsole("{INFO}: " + actor, value)
  },

  warning: function (actor, value) {
    logConsole("{WARN}: " + actor, value)
  },

  error: function (actor, value) {
    logConsole("{ERROR}: " + actor, value);
  }
};
module.exports = LocalStorage;
