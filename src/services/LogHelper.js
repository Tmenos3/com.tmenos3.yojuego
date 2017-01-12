let logConsole = function (actor, value) {
  let currentdate = new Date();
  let datetime =
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds() + "." +
    currentdate.getMilliseconds() +
    '-';

  let message = value == null ? '' : value.toString() == '[object Object]' ? JSON.stringify(value) : value;
  console.log(datetime + actor + " - " + message);
};

export default class LocalStorage {
  static log(actor, value) {
    logConsole("{INFO}: " + actor, value)
  }

  static warning(actor, value) {
    logConsole("{WARN}: " + actor, value)
  }

  static error(actor, value) {
    logConsole("{ERROR}: " + actor, value);
  }
}