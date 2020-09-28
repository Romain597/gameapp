
class Api {
  // axios instance
  #axios;
  // response data store
  #responseData;
  constructor() {
    this.#axios = require('axios');
    this.#axios.defaults.baseURL = "https://localhost:8000";
    //this.#axios.defaults.headers = {'Content-Type': 'application/json', Accept: 'application/json'}
    //this.#axios.defaults.timeout = 2500;
  }
  getApiGamesCount(n) {
    //let n;
    this.refreshApiGamesCount(n);
    //return this.#responseData;
    return n;
  }
  getApiGames( pagination , updateGamesMethod , sortingOptions ) {
    //console.log("getApiGames");
    let url = "/games";
    //if(sortingOptions.lenth>0) { console.log(sortingOptions); }
    //console.log(sortingOptions);
    if( sortingOptions.hasOwnProperty('orderField') === true ) {
      switch(sortingOptions.orderField) {
          case 'released':
            url = "/games/sort-by-released-date";
          break;
          case 'name':
            url = "/games/sort-by-name";
          break;
      }
    }
    let orderDir = null;
    if( sortingOptions.hasOwnProperty('orderBy') === true ) {
      if( typeof sortingOptions.orderBy === 'string' ) {
        const orderRegex = RegExp('(asc|desc)','i');
        if( orderRegex.test(sortingOptions.orderBy) === true ) {
          orderDir = sortingOptions.orderBy;
        }
      }
    }
    if( isNaN(pagination) === true ) {
      pagination = 1
    }
    pagination = parseInt(pagination, 10);
    return this.#axios.get( url , {
        params: {
          page: pagination,
          order: orderDir
        }
      })
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
  /*getApiGames( pagination , updateGamesMethod ) {
    //console.log("getApiGames");
    if( isNaN(pagination) === true ) {
      pagination = 1
    }
    pagination = parseInt(pagination, 10);
    return this.#axios.get( "/games" , {
        params: {
          page: pagination
        }
      })
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
  }*/
  /*getApiGamesWithSorting( orderField , orderBy , pagination , updateGamesMethod ) {
    //console.log("getApiGames");
    let url = "/games";
    switch(orderField) {
        case 'released':
          url = "/games/sort-by-released-date";
        break;
        case 'name':
          url = "/games/sort-by-name";
        break;
    }
    let orderDir = null;
    if( typeof orderBy === 'string' ) {
      const orderRegex = RegExp('(asc|desc)','i');
      if( orderRegex.test(orderBy) === true ) {
        orderDir = orderBy;
      }
    }
    if( isNaN(pagination) === true ) {
      pagination = 1
    }
    pagination = parseInt(pagination, 10);
    return this.#axios.get( url , {
        params: {
          page: pagination,
          order: orderDir
        }
      })
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
  }*/
  refreshApiGamesCount(n) {
    return this.#axios( { method: 'get', url: '/games/count', responseType: 'text' } )
    .then(function (response) {
      // handle success
      //console.log(response);
      //console.log(response.data);
      this.#responseData = parseInt(response.data, 10);
      n=response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
  /*async getApiGamesCount() {
    try {
      const response = await this.#axios( { method: 'get', url: '/games/count', responseType: 'text' } );
      //console.log(response);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }*/
  getApiGameWithId( gameId , updateGameMethod ) {
    //console.log("getApiGameWithId");
    return this.#axios.get( "/game/" + gameId )
      .then(function (response) {
        // handle success
        //console.log(response);
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
