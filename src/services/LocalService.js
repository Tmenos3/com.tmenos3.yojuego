class LocalService {
  static _token;
  static _userid;
  static _player;

  static saveToken(token) {
    _token = token;
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

  static hasToken() {
    return LocalService._token != null && LocalService._token != undefined;
  }
};

module.exports = LocalService;