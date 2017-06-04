import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import LocalServiceConstants from '../constants/LocalServiceConstants';

export default class LocalService {
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
        player: session.player,
        isFirstLogin: session.isFirstLogin,
        tourCompleted: session.tourCompleted
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
    return LocalService.getFriends()
      .then(ret => {
        let friends = ret || [];
        friends.push(newFriend);

        return LocalService.saveFriends(friends)
      }).catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            return LocalService.saveFriends([newFriend])
        }
      });
  }

  static saveNewGroup(newGroup) {
    return LocalService.getGroups()
      .then(ret => {
        let groups = ret || [];
        groups.push(newGroup);

        return LocalService.saveGroups(groups)
      }).catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            return LocalService.saveGroups([newGroup])
        }
      });
  }

  static saveFriends(friends) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.FRIENDS,
      rawData: friends,
      expires: null
    })
      .then(() => {
        return Promise.resolve(friends);
      });
  }

  static saveGroups(groups) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.GROUPS,
      rawData: groups,
      expires: null
    })
      .then(() => {
        return Promise.resolve(groups);
      });
  }

  static tourCompleted() {
    return LocalService.getSession()
      .then(session => {
        let newSession = {
          ...session,
          tourCompleted: true
        }
        return LocalService.saveSession(newSession);
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
    return LocalService.getSession()
      .then((session) => {
        return session.user;
      });
  }

  static getPlayer() {
    return LocalService.getSession()
      .then(session => {
        return session.player;
      });
  }

  static savePlayer(player) {
    return LocalService.getSession()
      .then((session) => {
        session.player = player;
        return LocalService.saveSession(session);
      });
  }

  static isFirstLogin() {
    return LocalService.getSession()
      .then((session) => {
        return session.isFirstLogin;
      });
  }

  static firstLoginDone() {
    return LocalService.getSession()
      .then((session) => {
        let newSession = {
          ...session,
          isFirstLogin: false
        }
        return LocalService.saveSession(newSession);
      });
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