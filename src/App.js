import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GameList from './GameList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {sortType:null}
  }
  sortByAlphaAsc() {
    this.setState({sortType:"alpha-asc"})
  }
  sortByAlphaDesc() {
    this.setState({sortType:"alpha-desc"})
  }
  sortByDateAsc() {
    this.setState({sortType:"date-asc"})
  }
  sortByDateDesc() {
    this.setState({sortType:"date-desc"})
  }
  resetSort() {
    this.setState({sortType:null})
  }
  componentDidMount() {
    //init
  }
  componentWillUnmount() {
    //fin de vie
  }
  render() {
    return (
      <React.Fragment>
      <header className="sortbar">
        <button id="sort-alpha-asc" className="btn" onClick={this.sortByAlphaAsc().bind(this)}>Trier par ordre alphabétique</button>
        <button id="sort-alpha-desc" className="btn" onClick={this.sortByAlphaDesc().bind(this)}>Trier par ordre alphabétique inversé</button>
        <button id="sort-date-desc" className="btn" onClick={this.sortByDateDesc().bind(this)}>Trier par date de sortie la plus récente</button>
        <button id="sort-date-asc" className="btn" onClick={this.sortByDateAsc().bind(this)}>Trier par date de sortie la moins récente</button>
        <button id="reset" className="btn" onClick={this.resetSort().bind(this)}>Réinitialiser</button>
      </header>
      <div className="App">
        <GameList sortType={this.state.sortType} />
      </div>
      </React.Fragment>
    );
  }
}

export default App;
