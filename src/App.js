import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GameList from './GameList';
import GameView from './GameView';

function Home({sortType,items,methodSortByAlphaAsc,methodSortByAlphaDesc,methodSortByDateDesc,methodSortByDateAsc,methodResetSort}) {
  return (
    <React.Fragment>
    <header className="sort-wrapper">
      <button id="sort-alpha-asc" className="btn" onClick={methodSortByAlphaAsc}>Trier par ordre alphabétique croissant</button>
      <button id="sort-alpha-desc" className="btn" onClick={methodSortByAlphaDesc}>Trier par ordre alphabétique décroissant</button>
      <button id="sort-date-desc" className="btn" onClick={methodSortByDateDesc}>Trier par date de sortie la plus récente</button>
      <button id="sort-date-asc" className="btn" onClick={methodSortByDateAsc}>Trier par date de sortie la moins récente</button>
      <button id="reset" className="btn" onClick={methodResetSort}>Réinitialiser le tri</button>
    </header>
    <div className="App">
      <GameList sortType={sortType} itemsSorted={items} />
    </div>
    </React.Fragment>
  );
}

function Single({selectedItem,items}) {
  return (
    <div className="App">
      <GameView itemNum={selectedItem} items={items} />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)
    /*this.props.items.forEach(( object , key ) => {
      let addId = {id: key};
      this.object = { ...object , ...addId }
    });*/
    this.state = { sortType: null , items: this.props.items }
    //this.loadDateObject()
    console.log(this.state)
  }
  loadDateObject = () => {
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
  sortByAlphaAsc = () => {
    let itemsSorted = this.state.items;
    itemsSorted.sort((a,b)=>{
      if(a.title > b.title) {
          return 1;
      } else {
          return -1;
      }
    });
    this.setState({ sortType: "alpha-asc" , items: itemsSorted })
  }
  sortByAlphaDesc = () => {
    let itemsSorted = this.state.items;
    itemsSorted.sort((a,b)=>{
      if(a.title < b.title) {
          return 1;
      } else {
          return -1;
      }
    });
    this.setState({sortType: "alpha-desc" , items: itemsSorted })
  }
  sortByDateAsc = () => {
    let itemsSorted = this.state.items;
    itemsSorted.sort((a,b)=>{
      if(a.releaseDate > b.releaseDate) {
          return 1;
      } else {
          return -1;
      }
    });
    this.setState({ sortType: "date-asc" , items: itemsSorted })
  }
  sortByDateDesc = () => {
    let itemsSorted = this.state.items;
    itemsSorted.sort((a,b)=>{
      if(a.releaseDate < b.releaseDate) {
          return 1;
      } else {
          return -1;
      }
    });
    this.setState({ sortType: "date-desc" , items: itemsSorted })
  }
  resetSort = () => {
    let itemsDefault = this.state.items;
    itemsDefault.sort((a,b)=>{
      if(a.num > b.num) {
          return 1;
      } else {
          return -1;
      }
    });
    this.setState({ sortType: null , items: itemsDefault })
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
    return <Home sortType={this.state.sortType} items={this.state.items} methodSortByAlphaAsc={this.sortByAlphaAsc} methodSortByAlphaDesc={this.sortByAlphaDesc} methodSortByDateDesc={this.sortByDateDesc} methodSortByDateAsc={this.sortByDateAsc} methodResetSort={this.resetSort} />

    /*return (
      <React.Fragment>
      <header className="sortbar">
        <button id="sort-alpha-asc" className="btn" onClick={this.sortByAlphaAsc}>Trier par ordre alphabétique croissant</button>
        <button id="sort-alpha-desc" className="btn" onClick={this.sortByAlphaDesc}>Trier par ordre alphabétique décroissant</button>
        <button id="sort-date-desc" className="btn" onClick={this.sortByDateDesc}>Trier par date de sortie la plus récente</button>
        <button id="sort-date-asc" className="btn" onClick={this.sortByDateAsc}>Trier par date de sortie la moins récente</button>
        <button id="reset" className="btn" onClick={this.resetSort}>Réinitialiser le tri</button>
      </header>
      <div className="App">
        <GameList sortType={this.state.sortType} itemsSorted={this.state.items} />
      </div>
      </React.Fragment>
    );*/
  }
}

export default App;


/*
  link => <Link to="/dashboard">Dashboard</Link>
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </Router>
*/