let BASEURL = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081';
//let BASEURL = 'http://192.168.0.22:8080';

var ApiService = {
  getPlayerByToken: function (token) {
    var _headers = new Headers();
    _headers.append('Authorization', "Bearer " + token);

    return fetch(BASEURL + "/player", { headers: _headers })
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
  setPlayerInfo: function (nickname, birthday, state, adminState, token) {
    let _headers = new Headers();
    _headers.append('Content-Type', 'application/json');
    _headers.append('authorization', 'Bearer ' + token);
    let form = {
      "nickname": nickname,
      "birthday": birthday,
      "state": state,
      "adminState": adminState,
    };

    return fetch(BASEURL + '/player/profile', {
      headers: _headers,
      method: 'post',
      body: JSON.stringify(form)
    }).then((response) => {
      if (response) {
        return response.json()
          .then((responseData) => {
            return responseData.resp;
          });
      }
      return response.json()
        .then((error) => {
          return Promise.reject(error);
        });
    }).catch((err) => {
      console.log(JSON.stringify(err));
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
  }
};

module.exports = ApiService;
