import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GameList from './GameList';
import GameView from './GameView';
//import { BrowserRouter, Route, Link } from "./node_modules/react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//{sortType,items,sortingMethod}
function Home(props) {
  return (
    <React.Fragment>
    <header className="App-sort-wrapper row justify-content-around align-items-stretch">
      <div className="col"><button id="sort-alpha-asc" className="btn btn-success h-100 w-100" onClick={props.sortingMethod}>Trier par ordre alphabétique croissant</button></div>
      <div className="col"><button id="sort-alpha-desc" className="btn btn-primary h-100 w-100" onClick={props.sortingMethod}>Trier par ordre alphabétique décroissant</button></div>
      <div className="col"><button id="sort-date-asc" className="btn btn-success h-100 w-100" onClick={props.sortingMethod}>Trier par date de sortie la moins récente</button></div>
      <div className="col"><button id="sort-date-desc" className="btn btn-primary h-100 w-100" onClick={props.sortingMethod}>Trier par date de sortie la plus récente</button></div>
      <div className="col"><button id="reset-sort" className="btn btn-danger h-100 w-100" onClick={props.sortingMethod}>Réinitialiser le tri</button></div>
    </header>
    <div className="App">
      <GameList sortType={props.sortType} itemsSorted={props.items} />
    </div>
    </React.Fragment>
  );
}

//{selectedItem,items}
function Single(props) {
  return (
    <div className="App">
      <GameView itemNum={props.selectedItem} items={props.items} />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sortType: null , items: this.props.items }
    this.loadDateObject = this.loadDateObject.bind(this)
    this.handleSortClick = this.handleSortClick.bind(this)
    //console.log(this.state)
    //console.log(this.props.items);
  }
  loadDateObject() {
    this.state.items.forEach( (item) => {
      item.releaseDate = this.getDateObject(item.releaseDate)
      item.comments.forEach( comment => comment.date = this.getDateObject(comment.date) );
    });
    //console.log(this.state.items)
  }
  getDateObject(dateString) {
    let dateObj = dateString;
    if( typeof dateString == "string" ) {
      let dateArray = dateString.split('-');
      let year = parseInt(dateArray[0] , 10);
      let month = parseInt(dateArray[1] , 10)-1;
      let day = parseInt(dateArray[2] , 10);
      dateObj = new Date(year,month,day);
    }
    return dateObj;
  }
  handleSortClick(e) {
    let itemsSorted = this.state.items;
    let type;
    let method;
    //console.log(e.target);
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
    //console.log(typeof method);
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
  componentDidMount() {
    //init
    //console.log(this.state)
  }
  componentWillUnmount() {
    //fin de vie
  }
  render() {
    this.loadDateObject()
    return (
      <Router>
          <Switch>
            <Route exact path="/GameApp/gameapp/public" render={(props) => (<Home sortType={this.state.sortType} items={this.state.items} sortingMethod={this.handleSortClick} />)} />
            <Route path="/GameApp/gameapp/public/view/:id" render={(props) => (<Single selectedItem={props.match.params.id} items={this.state.items} />)} />
          </Switch>
      </Router>
    );
  }
}

export default App;
