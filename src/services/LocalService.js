export default class LocalService {
  static _token;
  static _user;
  static _player;
  static _tourCompleted;
  static _isFirstLogin;
  static _friends = [];
  static _groups = [];

  static saveToken(token) {
    return new Promise((resolve, reject) => {
      LocalService._token = token;
      return resolve();
    });
  }

  static clearToken() {
    return new Promise((resolve, reject) => {
      LocalService._token = null;
      return resolve();
    });
  }

  static saveNewFriend(newFriend) {
    return new Promise((resolve, reject) => {
      LocalService._friends.push(newFriend);
      return resolve(LocalService._friends);
    });
  }

  static saveNewGroup(newGroup) {
    return new Promise((resolve, reject) => {
      LocalService._groups.push(newGroup);
      return resolve(LocalService._groups);
    });
  }

  static saveFriends(friends) {
    return new Promise((resolve, reject) => {
      LocalService._friends = friends;
      return resolve(LocalService._friends);
    });
  }

  static saveGroups(groups) {
    return new Promise((resolve, reject) => {
      LocalService._groups = groups;
      return resolve(LocalService._groups);
    });
  }

  static tourCompleted() {
    LocalService._tourCompleted = true;

    return new Promise((resolve, reject) => {
      return resolve();
    });
  }

  static saveUser(user) {
    LocalService._user = user;
  }

  static savePlayer(player) {
    LocalService._player = player;
  }

  static getToken() {
    return LocalService._token;
  }

  static getUser() {
    return LocalService._user;
  }

  static getPlayer() {
    return new Promise((resolve, reject) => {
      return resolve(LocalService._player);
    });
  }

  static isFirstLogin() {
    //return _isFirstLogin == true;
    return false;
  }

  static firstLoginDone() {
    LocalService._isFirstLogin = true;
  }

  static getFriends() {
    return new Promise((resolve, reject) => {
      return resolve(LocalService._friends);
    });
  }

  static getGroups() {
    return new Promise((resolve, reject) => {
      return resolve(LocalService._groups);
    });
  }
};