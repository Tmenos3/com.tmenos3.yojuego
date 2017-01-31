//const BASEURL = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081';
const BASEURL = 'http://192.168.0.14:8080';

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
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');
    _headers.append('Authorization', "Bearer " + token);

    let form = {
      "firstName": firstName,
      "lastName": lastName,
      "nickName": nickName
    };
    return fetch(BASEURL + "/player/create", {
      method: 'put',
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

  static getUpcomingPlayerMatches(token) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');
    _headers.append('Authorization', "Bearer " + token);

    return fetch(BASEURL + "/match/upcoming", {
      method: 'get',
      headers: _headers
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
}