import React from 'react';
//import './App.css';
import GameList from './GameList';
import GameView from './GameView';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function ButtonSort(props) {
  return (
    <div className={props.colClass}><button id={props.btnId} className={props.btnClass} onClick={props.sortingMethod}>{props.children}</button></div>
  );
}

function ButtonSortList(props) {
  return (
    <header className="row justify-content-between align-items-stretch my-4">
      <ButtonSort colClass="col" btnId="sort-alpha-asc" btnClass="btn btn-success h-100 w-100" sortingMethod={props.sortingMethod}>Trier par ordre alphabétique croissant</ButtonSort>
      <ButtonSort colClass="col" btnId="sort-alpha-desc" btnClass="btn btn-primary h-100 w-100" sortingMethod={props.sortingMethod}>Trier par ordre alphabétique décroissant</ButtonSort>
      <ButtonSort colClass="col" btnId="sort-date-asc" btnClass="btn btn-success h-100 w-100" sortingMethod={props.sortingMethod}>Trier par date de sortie croissante</ButtonSort>
      <ButtonSort colClass="col" btnId="sort-date-desc" btnClass="btn btn-primary h-100 w-100" sortingMethod={props.sortingMethod}>Trier par date de sortie décroissante</ButtonSort>
      <ButtonSort colClass="col" btnId="reset-sort" btnClass="btn btn-danger h-100 w-100" sortingMethod={props.sortingMethod}>Réinitialiser le tri</ButtonSort>
    </header>
  );
}

function Home(props) {
  return (
    <div className="App">
      <div className="container">
        <h2 className="text-center mt-3 mb-4 user-select-none">Liste de jeux</h2>
        <ButtonSortList sortingMethod={props.sortingMethod} />
        <GameList sortType={props.sortType} itemsSorted={props.items} />
      </div>
    </div>
  );
}

function Single(props) {
  return (
    <div className="App">
      <div className="container">
        <GameView itemNum={props.selectedItem} items={props.items} />
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)
    if(!localStorage.getItem('items')) {
      localStorage.setItem("items",JSON.stringify(this.props.items));
    }
    let itemsStored = JSON.parse(localStorage.getItem('items'));
    this.state = { sortType: null , items: itemsStored }
    this.loadDateObject = this.loadDateObject.bind(this)
    this.handleSortClick = this.handleSortClick.bind(this)
  }
  loadDateObject() {
    this.state.items.forEach( (item) => {
      item.releaseDate = this.getDateObject(item.releaseDate)
      item.comments.forEach( comment => comment.date = this.getDateObject(comment.date) );
    });
  }
  getDateObject(dateString) {
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
  }
  handleSortClick(e) {
    let itemsSorted = this.state.items;
    let type;
    let method;
    switch(e.target.id) {
      case "sort-alpha-asc":
        type = "alpha-asc";
        method = this.sortByAlphaAsc();
      break;
      case "sort-alpha-desc":
        type = "alpha-desc";
        method = this.sortByAlphaDesc();
      break;
      case "sort-date-asc":
        type = "date-asc";
        method = this.sortByDateAsc();
      break;
      case "sort-date-desc":
        type = "date-desc";
        method = this.sortByDateDesc();
      break;
      case "reset-sort":
        type = null;
        method = this.resetSort();
      break;
      default:
        type = this.state.sortType;
        method = null;
    }
    if( typeof method === 'function' ) {
      itemsSorted.sort(method);
    }
    this.setState({ sortType: type , items: itemsSorted })
  }
  sortByAlphaAsc() {
    return ((a,b)=>{
      if(a.title > b.title) {
          return 1;
      } else {
          return -1;
      }
    });
  }
  sortByAlphaDesc() {
    return ((a,b)=>{
      if(a.title < b.title) {
          return 1;
      } else {
          return -1;
      }
    });
  }
  sortByDateAsc() {
    return ((a,b)=>{
      if(a.releaseDate > b.releaseDate) {
          return 1;
      } else {
          return -1;
      }
    });
  }
  sortByDateDesc() {
    return ((a,b)=>{
      if(a.releaseDate < b.releaseDate) {
          return 1;
      } else {
          return -1;
      }
    });
  }
  resetSort() {
    return ((a,b)=>{
      if(a.num > b.num) {
          return 1;
      } else {
          return -1;
      }
    });
  }
  render() {
    this.loadDateObject()
    return (
      <Router>
          <Switch>
            <Route exact path="/GameApp/gameapp/public" render={() => (<Home sortType={this.state.sortType} items={this.state.items} sortingMethod={this.handleSortClick} />)} />
            <Route path="/GameApp/gameapp/public/view/:gameid" render={(props) => (<Single selectedItem={props.match.params.gameid} items={this.state.items} />)} />
          </Switch>
      </Router>
    );
  }
}

export default App;
