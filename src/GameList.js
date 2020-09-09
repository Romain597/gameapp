import React from 'react';
import './GameList.css';
import {
    Link
  } from "react-router-dom";

class GameList extends React.Component {
    constructor(props) {
        super(props)
        this.getItemList = this.getItemList.bind(this)
    }
    getItemList() {
        //<a href={} className="GameList-item" id={"item-" + item.num} key={item.num}>
        return this.props.itemsSorted.map( item =>
            <div className="GameList-col">
                <Link to={"/GameApp/gameapp/public/view/" + item.num} className="GameList-item" id={"item-" + item.num} key={item.num}>
                    <p className="GameList-item-title">{item.title}</p>
                    <img className="GameList-item-poster" src={"/" + item.poster} alt={"Affiche de " + item.title} />
                    <p className="GameList-item-date">{"Date de sortie : " + item.releaseDate.toLocaleDateString()}</p>
                    <p className="GameList-item-from">{"Studio : " + item.from}</p>
                </Link>
            </div>
        );
    }
    render() {
        //console.log(this.state.items);
        let list = this.getItemList()
        return (
            <div className="GameList">
                <div className="GameList-content">
                    <div className="GameList-row">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameList;
