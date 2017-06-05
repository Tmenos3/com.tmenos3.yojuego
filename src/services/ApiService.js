const BASEURL = 'http://192.168.0.4:8089';

export default class ApiService {
  static login(email, password) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "email": email,
      "password": password
    };

    return ApiService._fetch('post', _headers, form, '/login/yojuego');
  }

  static renewToken(token) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "token": token
    };
    return ApiService._fetch('post', _headers, form, '/login/renewtoken');
  }

  static getUserInfo(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/auth/info');
  }

  static createMatch(title, date, fromTime, toTime, location, matchType, pendingPlayers, token) {
    let form = {
      "title": title,
      "date": date,
      "fromTime": fromTime,
      "toTime": toTime,
      "location": location,
      "matchType": matchType,
      "pendingPlayers": pendingPlayers
    };

    return ApiService._fetch('put', ApiService._getHeader(token), form, '/match');
  }

  static signUp(email, password) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "email": email,
      "password": password
    };

    return ApiService._fetch('post', _headers, form, '/signup/yojuego');
  }

  static completeProfileInfo(firstName, lastName, nickName, token) {
    let form = {
      "firstName": firstName,
      "lastName": lastName,
      "nickName": nickName
    };

    return ApiService._fetch('put', ApiService._getHeader(token), form, '/player/create');
  }

  static getUpcomingPlayerMatches(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/match/upcoming');
  }

  static saveNewFriend(email, token) {
    let form = {
      "email": email
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/friendship/create');
  }

  static saveNewGroup(description, players, photo, token) {
    let form = {
      "description": description,
      "players": players,
      "photo": photo
    };

    return ApiService._fetch('put', ApiService._getHeader(token), form, '/group');
  }

  static getMyFriends(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/friendship');
  }

  static getMyGroups(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/group');
  }

  static getFriendshipRequest(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/notifications/friendshiprequest');
  }

  static getMatchInvitations(token) {
    return ApiService._fetch('get', ApiService._getHeader(token), null, '/notifications/matchinvitation');
  }

  static acceptFriendshipRequest(id, token) {
    let form = {
      "id": id
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/friendship/accept');
  }

  static rejectFriendshipRequest(id, token) {
    let form = {
      "id": id
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/friendship/reject');
  }

  static acceptMatchInvitation(id, token) {
    let form = { "matchId": id };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/match/confirmPlayer');
  }

  static rejectMatchInvitation(id, token) {
    let form = { "matchId": id };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/match/rejectPlayer');
  }

  static markAsReadFriendshipRequest(id, token) {
    let form = {
      "id": id
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/notifications/friendshiprequest/markasread')
  }

  static markAsReadMatchInvitation(id, token) {
    let form = {
      "id": id
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/notifications/matchinvitation/markasread')
  }

  static logOut(token) {
    return ApiService._fetch('post', ApiService._getHeader(token), null, '/logout')
  }

  static updateAccount(firstName, lastName, nickName, photo, phone, token) {
    let form = {
      firstName,
      lastName,
      nickName,
      photo,
      phone
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/player/update')
  }

  static editGroup(id, description, photo, token) {
    let form = {
      description,
      photo
    };

    return ApiService._fetch('post', ApiService._getHeader(token), form, '/group/' + id)
  }

  static _fetch(method, headers, body, url) {
    let fetchBody;
    if (body)
      fetchBody = JSON.stringify(body);
    return fetch(BASEURL + url, {
      method,
      headers,
      body: fetchBody
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData;
            });
        }

        return response.json().
          then((error) => {
            return Promise.reject(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static _getHeader(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + token);

    return headers;
  }
}