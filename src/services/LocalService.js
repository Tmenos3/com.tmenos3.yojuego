import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import LocalServiceConstants from '../constants/LocalServiceConstants';

export default class LocalService {
  static _token;
  static _user;
  static _player;
  static _tourCompleted;
  static _isFirstLogin;
  static _friends = [];
  static _groups = [];

  static __initLocalStorage() {
    this._storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,

      // if data was not found in storage or expired, 
      // the corresponding sync method will be invoked and return  
      // the latest data. 
      sync: {
        // we'll talk about the details later. 
      }
    })
  }

  static _getStorage() {
    if (!this._storage)
      LocalService.__initLocalStorage();

    return this._storage;
  }

  static saveSession(session) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.SESSION,
      rawData: {
        token: session.token,
        user: session.user,
        player: session.player
      },
      expires: null
    });
  }

  static clearToken() {
    return LocalService.getSession()
      .then((session) => {
        if (session) {
          let newSession = {
            ...session,
            token: null
          };

          return LocalService.saveSession(newSession);
        }
      });
  }

  static saveNewFriend(newFriend) {
    return LocalService._getStorage().load({
      key: LocalServiceConstants.FRIENDS
    }).then(ret => {
      let friends = ret || [];
      friends.push(newFriend);

      LocalService._getStorage().save({
        key: LocalServiceConstants.FRIENDS,
        rawData: friends,
        expires: null
      });

      return Promise.resolve(friends);
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          LocalService._getStorage().save({
            key: LocalServiceConstants.FRIENDS,
            rawData: [newFriend],
            expires: null
          });

          return Promise.resolve([newFriend]);
      }
    });
  }

  static saveNewGroup(newGroup) {
    return LocalService._getStorage().load({
      key: LocalServiceConstants.GROUPS
    }).then(ret => {
      let groups = ret || [];
      groups.push(newGroup);

      LocalService._getStorage().save({
        key: LocalServiceConstants.GROUPS,
        rawData: groups,
        expires: null
      });

      return Promise.resolve(friends);
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          LocalService._getStorage().save({
            key: LocalServiceConstants.GROUPS,
            rawData: [newGroup],
            expires: null
          });

          return Promise.resolve([newGroup]);
      }
    });
  }

  static saveFriends(friends) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.FRIENDS,
      rawData: friends,
      expires: null
    });
  }

  static saveGroups(groups) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.GROUPS,
      rawData: groups,
      expires: null
    });
  }

  static tourCompleted() {
    return LocalService._getStorage().load({
      key: LocalServiceConstants.SESSION
    }).then(session => {
      session.tourCompleted = true;
      LocalService._getStorage().save({
        key: LocalServiceConstants.SESSION,
        rawData: session,
        expires: null
      });

      return Promise.resolve();
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          session.tourCompleted = true;
          LocalService._getStorage().save({
            key: LocalServiceConstants.SESSION,
            rawData: session,
            expires: null
          });

          return Promise.resolve();
      }
    });
  }

  static getToken() {
    return LocalService.getSession()
      .then(session => {
        if (!session)
          return null;

        return session.token;
      }).catch(err => {
        throw new Error(err);
      });
  }

  static getSession() {
    return LocalService._getStorage().load({
      key: LocalServiceConstants.SESSION
    }).then(session => {
      return session;
    }).catch(err => {
      switch (err.name) {
        case 'NotFoundError':
          return null;

        default:
          throw new Exception(err);
      }
    });
  }

  static getUser() {
    return LocalService._user;
  }

  static getPlayer() {
    return LocalService._getStorage().load({
      key: LocalServiceConstants.SESSION
    }).then(session => {
      return session.player;
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
    return LocalService._getStorage().load({
      key: LocalServiceConstants.FRIENDS
    });
  }

  static getGroups() {
    return LocalService._getStorage().load({
      key: LocalServiceConstants.GROUPS
    });
  }

  static savePlayerMatches(matches) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.MATCHES,
      rawData: matches,
      expires: null
    });
  }

  static saveMatchInvitations(matchInvitations) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.MATCH_INVITATIONS,
      rawData: matchInvitations,
      expires: null
    });
  }
};