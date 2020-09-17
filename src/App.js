import React , { useState , useContext , useEffect } from 'react';
import GameList from './Components/GameList';
import GameView from './Components/GameView';
//import Datas from './datas.json';
import GamesContext from './Components/GamesContext'
import Api from './Api'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function ButtonSort(props) {
  const contextValue = useContext(GamesContext)
  return (
    <div className={props.colClass}><button id={props.btnId} className={props.btnClass} onClick={contextValue.sortingMethod}>{props.children}</button></div>
  );
}

function ButtonSortList() {
  return (
    <header className="row justify-content-between align-items-stretch my-4">
      <ButtonSort colClass="col" btnId="sort-alpha-asc" btnClass="btn btn-success h-100 w-100" >Trier par ordre alphabétique croissant</ButtonSort>
      <ButtonSort colClass="col" btnId="sort-alpha-desc" btnClass="btn btn-primary h-100 w-100" >Trier par ordre alphabétique décroissant</ButtonSort>
      <ButtonSort colClass="col" btnId="sort-date-asc" btnClass="btn btn-success h-100 w-100" >Trier par date de sortie croissante</ButtonSort>
      <ButtonSort colClass="col" btnId="sort-date-desc" btnClass="btn btn-primary h-100 w-100" >Trier par date de sortie décroissante</ButtonSort>
      <ButtonSort colClass="col" btnId="reset-sort" btnClass="btn btn-danger h-100 w-100" >Réinitialiser le tri</ButtonSort>
    </header>
  );
}

function Home() {
  return (
    <div className="App">
      <div className="container">
        <h2 className="text-center mt-3 mb-4 user-select-none">Liste de jeux</h2>
        <ButtonSortList />
        <GameList />
      </div>
    </div>
  );
}

function Single(props) {

  const contextValue = useContext(GamesContext)

  const getGameObjectSelected = (id) => {
    return (contextValue.games.filter( game => game.id === parseInt(id) ))[0]
  }

  return (
    <div className="App">
      <div className="container">
        <GameView game={getGameObjectSelected(props.gameId)} />
      </div>
    </div>
  );
}

const App = () => {
  /*constructor(props) {
    super(props)
    if(!localStorage.getItem('items')) {
      localStorage.setItem("items",JSON.stringify(this.props.items));
    }
    let itemsStored = JSON.parse(localStorage.getItem('items'));
    this.state = { sortType: null , items: itemsStored }
  }*/

  //const [ games , setGames ] = useState(Datas);
  const [ games , setGames ] = useState([]);
  /*const datas = Api.getGames();
  console.log(datas);
  const [ games , setGames ] = useState(datas);
  console.log(games);*/

  /*const loadDateObject = () => {
    games.forEach( (game) => {
      game.releaseDate = this.getDateObject(game.releaseDate)
      game.comments.forEach( comment => comment.date = this.getDateObject(comment.date) );
    });
  }

  const getDateObject = (dateString) => {
    let dateObj = dateString;
    if( typeof dateString == "string" ) {
      dateString = dateString.replace(/[Tt].+$/,'');
      let dateArray = dateString.split('-');
      let year = parseInt(dateArray[0] , 10);
      let month = parseInt(dateArray[1] , 10) - 1;
      let day = parseInt(dateArray[2] , 10);
      dateObj = new Date(Date.UTC(year,month,day));
    }
    return dateObj;
  }*/

  const handleSortClick = (event) => {
    let gamesSorted = games;
    //let type;
    let method;
    switch(event.target.id) {
      case "sort-alpha-asc":
        //type = "alpha-asc";
        method = sortByAlphaAsc;
      break;
      case "sort-alpha-desc":
        //type = "alpha-desc";
        method = sortByAlphaDesc;
      break;
      case "sort-date-asc":
        //type = "date-asc";
        method = sortByDateAsc;
      break;
      case "sort-date-desc":
        //type = "date-desc";
        method = sortByDateDesc;
      break;
      case "reset-sort":
        //type = null;
        method = resetSort;
      break;
      default:
        //type = this.state.sortType;
        method = null;
    }
    if( typeof method === 'function' ) {
      gamesSorted.sort(method);
    }
    setGames(gamesSorted);
  }

  const sortByAlphaAsc = () => {
    return ((a,b)=>{
      if(a.title > b.title) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByAlphaDesc = () => {
    return ((a,b)=>{
      if(a.title < b.title) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByDateAsc = () => {
    return ((a,b)=>{
      if(a.releaseDate > b.releaseDate) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByDateDesc = () => {
    return ((a,b)=>{
      if(a.releaseDate < b.releaseDate) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const resetSort = () => {
    return ((a,b)=>{
      if(a.id > b.id) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  /*const setDatas = () => axios({
    url: "/games",
    method: "get",
    baseURL: "https://localhost:8000"
  }).then((response)=>{
    console.log(response);
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    setGames(response.data);
    console.log(games);
  }).catch(error => console.log(error));*/

  useEffect( () => {
    /*axios.get("https://localhost:8000/games").then((response) => {
      console.log(response);
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
      setGames(response.data);
      console.log(games);
    });*/
    //setDatas();
    Api.setGamesWithApi(setGames);
  }, [games] );

  const contextValue = {
    games: games,
    updateGames: setGames,
    sortingMethod: handleSortClick
  }

  return (
    <GamesContext.Provider value={ contextValue } >
      <Router>
          <Switch>
            <Route exact path="/GameApp/gameapp/public" render={ () => ( <Home /> ) } />
            <Route path="/GameApp/gameapp/public/view/:gameid" render={ ( props ) => ( <Single gameId={ props.match.params.gameid } /> ) } />
          </Switch>
      </Router>
    </GamesContext.Provider>
  );
}

export default App;
