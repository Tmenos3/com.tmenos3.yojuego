var BASEURL = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081';
//var BASEURL = 'http://demo2.api.aula365.com/';

var ApiService = {
  getPlayerByToken: function(token) {
    var _headers = new Headers();
    _headers.append('Authorization', "Bearer " + token);

    return fetch(BASEURL + "/player" , { headers: _headers })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData;
            });
        }
        return Promise.reject("error");
      });
  },

  getAppToken: function (scope, clientId, clientSecret) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');
    var form = { 'scope': scope, 'client_id': clientId, 'client_secret': clientSecret };

    return fetch(BASEURL + "token", {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  getInitialContent: function (token) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    return fetch(
      BASEURL + "app/initial?token=" + token,
      { headers: _headers }
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  getVideos: function (token, skip, take) {
    var _headers = new Headers();
    _headers.append('Authorization', token);
    var url = "videos?skip=" + skip + "&take=" + take;
    return fetch(BASEURL + url, { headers: _headers })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  searchVideos: function (token, terms, skip, take) {
    var _headers = new Headers();
    _headers.append('Authorization', token);
    var url = "videos/search?terms=" + terms + "&skip=" + skip + "&take=" + take;
    return fetch(BASEURL + url, { headers: _headers })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  getVideo: function (token, id) {
    var _headers = new Headers();
    _headers.append('Authorization', token);

    return fetch(BASEURL + "videos/" + id, { headers: _headers })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  getQuestions: function (token, fromId, take) {
    var _headers = new Headers();
    _headers.append('Authorization', token);
    var url = "questions";
    url += "?fromId=" + fromId + "&take=" + take;
    return fetch(BASEURL + url, { headers: _headers })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  searchQuestions: function (token, terms, skip, take) {
    var _headers = new Headers();
    _headers.append('Authorization', token);
    var url = "questions/search?terms=" + terms + "&skip=" + skip + "&take=" + take;
    return fetch(BASEURL + url, { headers: _headers })
      .then((response) => {
        if (response) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  getQuestion: function (token, id) {
    var _headers = new Headers();
    _headers.append('Authorization', token);

    return fetch(BASEURL + "questions/" + id, { headers: _headers })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  updateQuestion: function (token, from) {
    var _headers = new Headers();
    _headers.append('Authorization', token);

    fetch(BASEURL + "questions/update?from=" + from,
      { headers: _headers })
      .then((response) => {
        if (response) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  submitAnswer: function (token, questionId, answer) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');
    _headers.append('Authorization', token);

    var form = { "text": answer };

    return fetch(BASEURL + "questions/" + questionId, {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  submitComment: function (token, videoId, comment) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');
    _headers.append('Authorization', token);
    var form = { "text": comment };

    return fetch(BASEURL + "videos/" + videoId + "/comments", {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((responseData) => {
              return responseData.response;
            });
        }
        return response.json()
          .then((error) => {
            return Promise.reject(error);
          });
      });
  },

  signUp: function (username, password, name, gender, birthdate, email, motive, outhclient) {
    var _headers = new Headers();
    _headers.append('Accept', 'application/json');
    _headers.append('Content-Type', 'application/json');

    var form = {
      "username": username,
      "password": password,
      "name": name,
      "gender": gender,
      "birthdate": birthdate,
      "tutor_email": email,
      "email": email,
      "motive": motive,
      "OAuthClient": outhclient
    };

    return fetch(BASEURL + "users/register", {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((response) => {
              return Promise.resolve({
                'data': {
                  token: response.token,
                  username: response.user.username,
                  premium: response.user.membership
                }
              });
            });
        }
        return response.json()
          .then((response) => {
            return Promise.reject(response);
          });
      });
  },

  logIn: function (username, password) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    var form = {
      "username": username,
      "password": password
    };

    return fetch(BASEURL + "login", {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then((response) => {
              return Promise.resolve({
                token: response.response.token,
                username: response.response.user.username,
                premium: response.response.user.membership
              });
            });
        }
        return response.json()
          .then((response) => {
            return Promise.reject(response);
          });
      });
  },

  submitComunityQuestion: function (token, title, description, subject) {
    var _headers = new Headers();
    _headers.append('Content-Type', 'application/json');

    var form = {
      "title": title,
      "description": description,
      "subject": subject
    };

    return fetch(BASEURL + "questions", {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    }).then(() => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
        .then((response) => {
          return Promise.reject(response);
        });
    });
  }
};

module.exports = ApiService;
