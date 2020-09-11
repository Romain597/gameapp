import React from 'react';
import './GameList.css';
import {
    Link
  } from "react-router-dom";

class GameList extends React.Component {
    constructor(props) {
        super(props)
        if(!localStorage.getItem('items')) {
            localStorage.setItem("items",JSON.stringify(this.props.items));
        }
        let itemsStored = JSON.parse(localStorage.getItem('items'));
        this.state = { items: itemsStored }
        this.getItemList = this.getItemList.bind(this)
    }
    getItemList() {
        const options = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };
        return this.props.itemsSorted.map( item =>
            <div className="GameList-col" key={item.num}>
                <Link to={"/GameApp/gameapp/public/view/" + item.num} className="GameList-item" id={"item-" + item.num}>
                    <p className="GameList-item-title">{item.title}</p>
                    <img className="GameList-item-poster" src={"/" + item.poster} alt={"Affiche de " + item.title} />
                    <p className="GameList-item-date">{"Date de sortie : " + item.releaseDate.toLocaleDateString('fr-FR', options)}</p>
                    <p className="GameList-item-from">{"Studio : " + item.from}</p>
                </Link>
            </div>
        );
    }
    render() {
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
