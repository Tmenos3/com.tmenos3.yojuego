//const BASEURL = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081';
const BASEURL = 'http://192.168.0.12:8089';

export default class ApiService {
  static login(email, password) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "email": email,
      "password": password
    };
    return fetch(BASEURL + "/login/yojuego", {
      method: 'post',
      headers: _headers,
      body: JSON.stringify(form)
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

      });
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
    return fetch(BASEURL + "/match", {
      method: 'put',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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

      });
  }

  static signUp(email, password) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    let form = {
      "email": email,
      "password": password
    };
    return fetch(BASEURL + "/signup/yojuego", {
      method: 'post',
      headers: _headers,
      body: JSON.stringify(form)
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

      });
  }

  static completeProfileInfo(firstName, lastName, nickName, token) {
    let form = {
      "firstName": firstName,
      "lastName": lastName,
      "nickName": nickName
    };
    return fetch(BASEURL + "/player/create", {
      method: 'put',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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

      });
  }

  static getUpcomingPlayerMatches(token) {
    return fetch(BASEURL + "/match/upcoming", {
      method: 'get',
      headers: ApiService._getHeader(token)
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

      });
  }

  static saveNewFriend(email, token) {
    let form = {
      "email": email
    };

    return fetch(BASEURL + "/friendship/create", {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static saveNewGroup(description, players, photo, token) {
    let form = {
      "description": description,
      "players": players,
      "photo": photo
    };

    return fetch(BASEURL + "/group/create", {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static getMyFriends(token) {
    return fetch(BASEURL + "/friendship", {
      method: 'get',
      headers: ApiService._getHeader(token)
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
      });
  }

  static getMyGroups(token) {
    return fetch(BASEURL + "/group", {
      method: 'get',
      headers: ApiService._getHeader(token)
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
      });
  }

  static getFriendshipRequest(token) {
    return fetch(BASEURL + "/notifications/friendshiprequest", {
      method: 'get',
      headers: ApiService._getHeader(token)
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
      });
  }

  static getMatchInvitations(token) {
    return fetch(BASEURL + "/notifications/matchinvitation", {
      method: 'get',
      headers: ApiService._getHeader(token)
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
      });
  }

  static acceptFriendshipRequest(id, token) {
    let form = {
      "id": id
    };

    return fetch(BASEURL + "/friendship/accept", {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static rejectFriendshipRequest(id, token) {
    let form = {
      "id": id
    };

    return fetch(BASEURL + "/friendship/reject", {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static acceptMatchInvitation(id, token) {
    let form = { "matchId": id };
    return fetch(BASEURL + '/match/confirmPlayer', {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static rejectMatchInvitation(id, token) {
    let form = { "matchId": id };
    return fetch(BASEURL + '/match/rejectPlayer', {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static markAsReadFriendshipRequest(id, token) {
    let form = {
      "id": id
    };

    return fetch(BASEURL + "/notifications/friendshiprequest/markasread", {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static markAsReadMatchInvitation(id, token) {
    let form = {
      "id": id
    };

    return fetch(BASEURL + "/notifications/matchinvitation/markasread", {
      method: 'post',
      headers: ApiService._getHeader(token),
      body: JSON.stringify(form)
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
      });
  }

  static logOut(token) {
    return fetch(BASEURL + "/logout", {
      method: 'post',
      headers: ApiService._getHeader(token)
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
      });
  }

  static _getHeader(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + token);

    return headers;
  }
}