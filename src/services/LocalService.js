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
        deviceId: session.deviceId,
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
        if (!session)
          return null;

        return session.user;
      });
  }

  static getPlayer() {
    return LocalService.getSession()
      .then(session => {
        if (!session)
          return null;

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

  static updateDeviceId(deviceId) {
    return LocalService.getSession()
      .then((session) => {
        session.deviceId = deviceId;
        return LocalService.saveSession(session);
      });
  }

  static isFirstLogin() {
    return LocalService.getSession()
      .then((session) => {
        if (!session)
          return true;

        return session.isFirstLogin === undefined || session.isFirstLogin === null || session.isFirstLogin === true;
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

  static getMatches() {
    return LocalService._getStorage().load({
      key: LocalServiceConstants.MATCHES
    });
  }

  static updateGroup(group) {
    return LocalService.getGroups()
      .then((groups) => {
        let i = groups.findIndex((g) => { return g._id === group._id; });
        groups[i] = group;
        return LocalService.saveGroups(groups)
      })
      .then(() => {
        return Promise.resolve(group);
      });
  }

  static updateMatch(match) {
    return LocalService.getMatches()
      .then((matches) => {
        let i = matches.findIndex((m) => { return m._id === match._id; });
        matches[i] = match;
        return LocalService.saveMatches(matches);
      })
      .then(() => {
        return Promise.resolve(match);
      });
  }

  static saveMatches(matches) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.MATCHES,
      rawData: matches,
      expires: null
    })
      .then(() => {
        return Promise.resolve(matches);
      });
  }

  static saveMatchInvitations(matchInvitations) {
    return LocalService._getStorage().save({
      key: LocalServiceConstants.MATCH_INVITATIONS,
      rawData: matchInvitations,
      expires: null
    });
  }

  static deleteGroup(id) {
    return LocalService.getGroups()
      .then((groups) => {
        let i = groups.findIndex((g) => { return g._id === id; });
        if (i > -1)
          groups.splice(i, 1);

        return LocalService.saveGroups(groups);
      });
  }

  static deleteFriend(id) {
    return LocalService.getFriends()
      .then((friends) => {
        let i = friends.findIndex(f => { return f._id === id; });
        if (i > -1)
          friends.splice(i, 1);

        return LocalService.saveFriends(friends);
      });
  }

  static saveNewMatch(newMatch) {
    return LocalService.getMatches()
      .then(ret => {
        let matches = ret || [];
        matches.push(newMatch);

        return LocalService.saveMatches(matches);
      }).catch(err => {
        switch (err.name) {
          case 'NotFoundError':
            return LocalService.saveMatches([newMatch]);
        }
      });
  }

  static getGroup(groupId) {
    return LocalService.getGroups()
      .then(groups => {
        return Promise.resolve(groups.find(g => { return g._id === groupId }));
      });
  }

  static getMatch(matchId) {
    return LocalService.getMatches()
      .then(matches => {
        return Promise.resolve(matches.find(m => { return m._id === matchId }));
      });
  }
};