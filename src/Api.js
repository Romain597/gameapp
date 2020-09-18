
class Api {
  #axios;
  constructor() {
    this.#axios = require('axios');
    this.#axios.defaults.baseURL = "https://localhost:8000";
  }
  getGamesWithApi( updateGamesMethod ) {
    return this.#axios({
        url: "/games",
        method: "get"
      })
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
}

const api = new Api();
export default api
