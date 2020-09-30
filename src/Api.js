
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

  getApiGamesWithClassify( letterValue , updateDatas , dataType ) {
    //console.log("getApiGamesWithClassify");
    let url = "";
    let parametersObject = { letter: letterValue }
    //console.log(dataType);
    //console.log(letterValue);
    switch(dataType) {
        case 'studios':
          url = "studios-by-letter";
        break;
        case 'categories':
          url = "categories-by-letter";
        break;
    }
    if( url.trim() !== "" ) {
        return this.#axios.get( url , {
            params: parametersObject
          })
          .then(function (response) {
            // handle success
            console.log(response);
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.statusText);
            //console.log(response.headers);
            //console.log(response.config);
            updateDatas(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      } else {
          return [];
      }
  }

  getApiGames( pagination , updateGamesMethod , sortingOptions ) {
    //console.log("getApiGames");
    let url = "/games";
    let parametersObject = {}
    //console.log(sortingOptions);
    if( sortingOptions.hasOwnProperty('orderField') === true && sortingOptions.hasOwnProperty('classifyField') === false ) {
      switch(sortingOptions.orderField) {
          case 'released':
            url = "/games/sort-by-released-date";
          break;
          case 'name':
            url = "/games/sort-by-name";
          break;
      }
    }
    if( sortingOptions.hasOwnProperty('classifyField') === true ) {
      if( sortingOptions.hasOwnProperty('orderField') === true ) {
          parametersObject = { field: sortingOptions.orderField , ...parametersObject };
      }
      switch(sortingOptions.classifyField) {
          case 'category':
            url = "/games/by-categories";
            if( sortingOptions.hasOwnProperty('classifyId') === true ) {
                parametersObject = { category: sortingOptions.classifyId , ...parametersObject };
            }
          break;
          case 'studio':
            url = "/games/by-studios";
            if( sortingOptions.hasOwnProperty('classifyId') === true ) {
                parametersObject = { studio: sortingOptions.classifyId , ...parametersObject };
            }
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
    parametersObject = { page: pagination, order: orderDir , ...parametersObject }
    return this.#axios.get( url , {
        params: parametersObject
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

  getApiCategoriesList( updateCategoriesMethod ) {
    //console.log("getApiCategoriesList");
    return this.#axios.get( "/categories" )
      .then(function (response) {
        // handle success
        //console.log(response);
        updateCategoriesMethod(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  getApiCategoriesAlphabeticDatas( updateCategoriesAlphabeticDatasMethod ) {
    //console.log("getApiCategoriesAlphabeticDatas");
    return this.#axios.get( "/categories-games-count-by-letter" )
      .then(function (response) {
        // handle success
        //console.log(response);
        updateCategoriesAlphabeticDatasMethod(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  getApiStudiosList( updateStudiosMethod ) {
    //console.log("getApiStudiosList");
    return this.#axios.get( "/studios" )
      .then(function (response) {
        // handle success
        //console.log(response);
        updateStudiosMethod(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  getApiStudiosAlphabeticDatas( updateStudiosAlphabeticDatasMethod ) {
    //console.log("getApiStudiosAlphabeticDatas");
    return this.#axios.get( "/studios-games-count-by-letter" )
      .then(function (response) {
        // handle success
        //console.log(response);
        updateStudiosAlphabeticDatasMethod(response.data);
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
