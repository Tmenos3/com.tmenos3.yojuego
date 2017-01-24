export default class LocalService {
  static _token;
  static _userid;
  static _player;
  static _tourCompleted;
  static _isFirstLogin;

  static saveToken(token) {
    return new Promise((resolve, reject) => {
      _token = token;
      return resolve();
    });
  }

  static tourCompleted() {
    _tourCompleted = true;
  }

  static saveUserId(userid) {
    _userid = userid;
  }

  static savePlayer(player) {
    _player = player;
  }

  static getToken() {
    return _token;
  }

  static getUserId() {
    return _userid;
  }

  static getPlayer() {
    return _player;
  }

  static isFirstLogin() {
    //return _isFirstLogin == true;
    return false;
  }

  static firstLoginDone(){
    _isFirstLogin = true;
  }
};