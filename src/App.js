import React , { useState , useContext , useEffect , useCallback } from 'react';
import GameList from './Components/GameList';
import GameView from './Components/GameView';
import Datas from './datas.json';
import GamesContext from './Components/GamesContext'
import Api from './Api'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function ButtonSort(props) {
  const contextValue = useContext(GamesContext)
  //props.handleSortMethod
  //contextValue.sortingMethod
  return (
    <div className={props.colClass}><button id={props.btnId} className={props.btnClass} onClick={contextValue.sortingMethod}>{props.children}</button></div>
  );
}

function ButtonSortList() {

  /*const getDateObject =  (dateString) => {
      let dateObj = dateString;
      if( typeof dateString == "string" ) {
          dateString = dateString.replace(/[Tt].+$/,'');
          dateString = dateString.trim()
          let dateArray = dateString.split('-');
          let year = parseInt(dateArray[0] , 10);
          let month = parseInt(dateArray[1] , 10) - 1;
          let day = parseInt(dateArray[2] , 10);
          dateObj = new Date(Date.UTC(year,month,day,0,0,0));
      }
      return dateObj;
  }

  const contextValue = useContext(GamesContext)

  const handleSortClick = (event) => {
    //console.log(event.target.id)
    //console.log(games)
    //console.log(contextValue.games)
    let gamesSorted = contextValue.games;
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
    //console.log(gamesSorted);
    if( typeof method === 'function' ) {
      gamesSorted.sort(method());
      //console.log(gamesSorted);
    }
    contextValue.updateGames(gamesSorted);
  }

  const sortByAlphaAsc = () => {
    return ((a,b)=>{
      //console.log(a);
      //console.log(b);
      if(a.name > b.name) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByAlphaDesc = () => {
    return ((a,b)=>{
      if(a.name < b.name) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByDateAsc = () => {
    return ((a,b)=>{
      if(getDateObject(a.releasedAt) > getDateObject(b.releasedAt)) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByDateDesc = () => {
    return ((a,b)=>{
      if(getDateObject(a.releasedAt) < getDateObject(b.releasedAt)) {
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
  }*/

  //handleSortClick
  return (
    <header className="row justify-content-between align-items-stretch my-4">
      <ButtonSort handleSortMethod={null} colClass="col" btnId="sort-alpha-asc" btnClass="btn btn-success h-100 w-100" >Trier par ordre alphabétique croissant</ButtonSort>
      <ButtonSort handleSortMethod={null} colClass="col" btnId="sort-alpha-desc" btnClass="btn btn-primary h-100 w-100" >Trier par ordre alphabétique décroissant</ButtonSort>
      <ButtonSort handleSortMethod={null} colClass="col" btnId="sort-date-asc" btnClass="btn btn-success h-100 w-100" >Trier par date de sortie croissante</ButtonSort>
      <ButtonSort handleSortMethod={null} colClass="col" btnId="sort-date-desc" btnClass="btn btn-primary h-100 w-100" >Trier par date de sortie décroissante</ButtonSort>
      <ButtonSort handleSortMethod={null} colClass="col" btnId="reset-sort" btnClass="btn btn-danger h-100 w-100" >Réinitialiser le tri</ButtonSort>
    </header>
  );
}

function Home() {
  return (
    <div className="App">
      <div className="container">
        <h2 className="text-center mt-3 mb-4 user-select-none">Liste de jeux PC</h2>
        <ButtonSortList />
        <GameList />
      </div>
    </div>
  );
}

function Single(props) {

  /*const contextValue = useContext(GamesContext)

  const getGameObjectSelected = (id) => {
    return (contextValue.games.filter( game => game.id === parseInt(id) ))[0]
  }*/
//game={getGameObjectSelected(props.gameId)}

/*const fetchGame = useCallback((setGameMethod) => {
  Api.getApiGameWithId(props.gameId,setGameMethod);
}, [props.gameId]);*/

//fetchGame={fetchGame}
  return (
    <div className="App">
      <div className="container">
        <GameView gameId={props.gameId} />
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
  
  const [ games , setGames ] = useState( [] );
  

  //console.log(games);
  /*const datas = Api.getGames();
  console.log(datas);
  const [ games , setGames ] = useState(datas);
  console.log(games);*/

  /*const loadDateObject = () => {
    games.forEach( (game) => {
      game.releasedAt = this.getDateObject(game.releasedAt)
      game.comments.forEach( comment => comment.date = this.getDateObject(comment.date) );
    });
  }*/

  const getDateObject =  (dateString) => {
      let dateObj = dateString;
      if( typeof dateString == "string" ) {
          dateString = dateString.replace(/[Tt].+$/,'');
          dateString = dateString.trim()
          let dateArray = dateString.split('-');
          let year = parseInt(dateArray[0] , 10);
          let month = parseInt(dateArray[1] , 10) - 1;
          let day = parseInt(dateArray[2] , 10);
          dateObj = new Date(Date.UTC(year,month,day,0,0,0));
      }
      return dateObj;
  }

  const handleSortClick = (event) => {
    //console.log(event.target.id)
    console.log(games)
    //console.log(contextValue.games)
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
    //console.log(gamesSorted);
    if( typeof method === 'function' ) {
      gamesSorted.sort(method());
      console.log(gamesSorted);
    }
    setGames(gamesSorted);
  }

  const sortByAlphaAsc = () => {
    return ((a,b)=>{
      //console.log(a);
      //console.log(b);
      if(a.name > b.name) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByAlphaDesc = () => {
    return ((a,b)=>{
      if(a.name < b.name) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByDateAsc = () => {
    return ((a,b)=>{
      if(getDateObject(a.releasedAt) > getDateObject(b.releasedAt)) {
          return 1;
      } else {
          return -1;
      }
    });
  }

  const sortByDateDesc = () => {
    return ((a,b)=>{
      if(getDateObject(a.releasedAt) < getDateObject(b.releasedAt)) {
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

 //console.log(games);

  useEffect( () => {
    Api.getApiGames(setGames);
    //Api.getGames(setGames);
    /*axios.get('https://localhost:8000/games')
      .then(response => {
        const datas = response.data;
        setGames( datas );
      });*/
      /*let ignore = false;    
      async function fetchData() {
        const response = await fetch('https://localhost:8000/games');
        const json = await response.json();
        if (!ignore) setGames(json);    
      }
      fetchData();
      return () => { ignore = true };*/
  }, [games] );

  const contextValue = {
    games: games,
    updateGames: setGames,
    sortingMethod: handleSortClick
  }
 
  /*const contextValue = {
    sortingMethod: handleSortClick
  }*/

//console.log(games);
//console.log(Api.test());

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
