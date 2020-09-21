
class Api {
  #axios;
  constructor() {
    this.#axios = require('axios');
    this.#axios.defaults.baseURL = "https://localhost:8000";
  }
  getApiGames( updateGamesMethod ) {
    return this.#axios.get("/games")
      .then(function (response) {
        // handle success
        //console.log(response);
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
    return this.#axios.get("/game/" + gameId)
      .then(function (response) {
        // handle success
        console.log(response);
        //console.log(response.data.created_at);
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
}

const api = new Api();
export default api
