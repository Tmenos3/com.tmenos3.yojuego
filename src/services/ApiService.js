const BASEURL = 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081';
//const BASEURL = 'http://192.168.0.14:8080';

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
  // getPlayerByToken: function (token) {
  //   var _headers = new Headers();
  //   _headers.append('Authorization', "Bearer " + token);
  //   _headers.append('Content-Type', 'application/json');

  //   return fetch(BASEURL + "/player", { headers: _headers })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()
  //           .then((responseData) => {
  //             return responseData;
  //           });
  //       }
  //       return response.json()
  //         .then((error) => {
  //           return Promise.reject(error);
  //         });
  //     });
  // },
  // sendMailRestorePassword: function (email) {
  //   return new Promise((resolve, reject) => {
  //     var _headers = new Headers();
  //     _headers.append('Content-Type', 'application/json');

  //     let form = {
  //       "email": email
  //     };

  //     fetch(BASEURL + '/resetPassword', {
  //       headers: _headers,
  //       method: 'post',
  //       body: JSON.stringify(form)
  //     })
  //       .then((response) => {
  //         if (response) {
  //           if (response.ok) {
  //             resolve();
  //           } else {
  //             response.json()
  //               .then((resp) => {
  //                 reject(resp.message)
  //               }, (err) => {
  //                 reject(err)
  //               });
  //           }
  //         } else {
  //           response.json()
  //             .then((error) => {
  //               reject(error)
  //             }, (err) => {
  //               reject(err)
  //             });
  //         }
  //       }, (err) => {
  //         reject(err)
  //       });
  //   });



  //   // return fetch(BASEURL + '/resetPassword', {
  //   //   headers: _headers,
  //   //   method: 'post',
  //   //   body: JSON.stringify(form)
  //   // }).then((response) => {
  //   //   if (response) {
  //   //     if (response.ok) {
  //   //       Promise.resolve();
  //   //     } else {
  //   //       response.json()
  //   //         .then((resp) => {
  //   //           Promise.reject(resp.message);
  //   //         }, (err) => {
  //   //           Promise.reject(err);
  //   //         });
  //   //     }
  //   //   } else {
  //   //     response.json()
  //   //       .then((error) => {
  //   //         Promise.reject(error);
  //   //       }, (err) => {
  //   //         Promise.reject(err);
  //   //       });
  //   //   }
  //   // }, (err) => { })
  //   //   .then((resp) => {

  //   //   }, (err) => { })
  //   //   .catch((err) => {
  //   //     console.log(JSON.stringify(err));
  //   //     Promise.reject(JSON.stringify(err));
  //   //   });
  // },
  // setPlayerInfo: function (nickname, birthday, state, adminState, token) {
  //   let _headers = new Headers();
  //   _headers.append('Content-Type', 'application/json');
  //   _headers.append('authorization', 'Bearer ' + token);
  //   let form = {
  //     "nickname": nickname,
  //     "birthday": birthday,
  //     "state": state,
  //     "adminState": adminState,
  //   };

  //   return fetch(BASEURL + '/player/profile', {
  //     headers: _headers,
  //     method: 'post',
  //     body: JSON.stringify(form)
  //   }).then((response) => {
  //     if (response) {
  //       return response.json()
  //         .then((responseData) => {
  //           return responseData.resp;
  //         });
  //     }
  //     return response.json()
  //       .then((error) => {
  //         return Promise.reject(error);
  //       });
  //   }).catch((err) => {
  //     console.log(JSON.stringify(err));
  //   });
  // },
  // updateQuestion: function (token, from) {
  //   var _headers = new Headers();
  //   _headers.append('Authorization', token);

  //   fetch(BASEURL + "questions/update?from=" + from,
  //     { headers: _headers })
  //     .then((response) => {
  //       if (response) {
  //         return response.json()
  //           .then((responseData) => {
  //             return responseData.response;
  //           });
  //       }
  //       return response.json()
  //         .then((error) => {
  //           return Promise.reject(error);
  //         });
  //     });
  // },

  // getMatchInfo(matchId, token) {
  //   var _headers = new Headers();
  //   _headers.append('Authorization', "Bearer " + token);
  //   _headers.append('Content-Type', 'application/json');

  //   return fetch(BASEURL + "/match/" + matchId, { headers: _headers })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()
  //           .then((responseData) => {
  //             return responseData.resp;
  //           });
  //       }
  //       return response.json()
  //         .then((error) => {
  //           return Promise.reject(error);
  //         });
  //     });
  // },
  // getPlayers(playerIds, token) {
  //   var _headers = new Headers();
  //   _headers.append('Authorization', "Bearer " + token);
  //   _headers.append('Content-Type', 'application/json');
  //   let form = {
  //     "playerIds": playerIds
  //   };

  //   return fetch(BASEURL + "/player/all" + matchId, {
  //     headers: _headers,
  //     method: 'post',
  //     body: JSON.stringify(form)
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json()
  //           .then((responseData) => {
  //             return responseData.resp;
  //           });
  //       }
  //       return response.json()
  //         .then((error) => {
  //           return Promise.reject(error);
  //         });
  //     });
  // },
  // sendComment(playerId, matchId, comment, token) {
  //   let _headers = new Headers();
  //   _headers.append('Content-Type', 'application/json');
  //   _headers.append('authorization', 'Bearer ' + token);
  //   let form = {
  //     "owner": playerId,
  //     "text": comment
  //   };

  //   return fetch(BASEURL + '/match/' + matchId + '/comment', {
  //     headers: _headers,
  //     method: 'post',
  //     body: JSON.stringify(form)
  //   }).then((response) => {
  //     if (response) {
  //       return response.json()
  //         .then((responseData) => {
  //           return responseData.resp;
  //         });
  //     }
  //     return response.json()
  //       .then((error) => {
  //         return Promise.reject(error);
  //       });
  //   }).catch((err) => {
  //     console.log(JSON.stringify(err));
  //   });
  // }
}