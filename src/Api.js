
class Api {
  #axios;
  constructor() {
    this.#axios = require('axios');
    this.#axios.defaults.baseURL = "https://localhost:8000";
    //this.#axios.defaults.headers = {'Content-Type': 'application/json', Accept: 'application/json'}
    //this.#axios.defaults.timeout = 2500;
  }
  getApiGames( updateGamesMethod ) {
    //console.log("getApiGames");
    return this.#axios.get( "/games" )
      .then(function (response) {
        // handle success
        //console.log(response);
        //console.log(response.data);
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);
        updateGamesMethod(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  getApiGameWithId( gameId , updateGameMethod ) {
    //console.log("getApiGameWithId");
    return this.#axios.get( "/game/" + gameId )
      .then(function (response) {
        // handle success
        console.log(response);
        updateGameMethod(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  /*setApiNewComment( newComment ) {
    console.log("setApiNewComment");
    //console.log(newComment);
    return this.#axios( { method: "post", url: "/game/comment", data: newComment,
        transformRequest: [function (data, headers) {
          // Do whatever you want to transform the data
          return JSON.stringify(data, {arrayFormat: 'brackets'});
          //return data;
        }]
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }*/
  setApiNewComment( newComment ) {
    console.log("setApiNewComment");
    //console.log(newComment);
    return this.#axios.post( "/game/comment", newComment )
      .then(function (response) {
        // handle success
        console.log(response);
        //console.log(response.data);
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);
        //return getCommentPostId(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  async getGame( gameId , updateGameMethod ) {
    console.log("getGame");
    try {
      const response = await this.#axios.get("/game/" + gameId);
      //console.log(response);
      updateGameMethod(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
}

const api = new Api();
export default api
