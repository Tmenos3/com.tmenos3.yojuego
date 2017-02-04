export default class LocalService {
  static _token;
  static _userid;
  static _player;
  static _tourCompleted;
  static _isFirstLogin;
  static _friends = [];
  static _groups = [];

  static saveToken(token) {
    return new Promise((resolve, reject) => {
      _token = token;
      return resolve();
    });
  }

  static saveNewFriend(newFriend) {
    return new Promise((resolve, reject) => {
      _friends.push(newFriend);
      return resolve();
    });
  }

  static saveNewGroup(newGroup) {
    return new Promise((resolve, reject) => {
      _groups.push(newGroup);
      return resolve();
    });
  }

  static saveFriends(friends) {
    return new Promise((resolve, reject) => {
      _friends = friends;
      return resolve();
    });
  }

  static saveGroups(groups) {
    return new Promise((resolve, reject) => {
      _groups = groups;
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

  static firstLoginDone() {
    _isFirstLogin = true;
  }

  static getFriends() {
    return new Promise((resolve, reject) => {
      return resolve(_friends);
    });
  }

  static getGroups() {
    return new Promise((resolve, reject) => {
      return resolve(_groups);
    });
  }
};