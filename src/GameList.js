import React from 'react';
//import './GameList.css';
import {
    Link
  } from "react-router-dom";

function ItemListInfo(props) {
    return (
        <React.Fragment>
        <h6 className="text-center font-weight-bold my-2">{props.item.title}</h6>
        <img className="text-center w-100 mt-1 img-fluid" src={"/" + props.item.poster} alt={"Affiche de " + props.item.title} />
        <p className="text-center my-2">{"Date de sortie : " + props.item.releaseDate.toLocaleDateString('fr-FR', props.dateOptions)}</p>
        <p className="text-center my-2">{"Studio : " + props.item.from}</p>
        </React.Fragment>
    );
}

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
            <Link to={"/GameApp/gameapp/public/view/" + item.num} key={item.num} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"item-" + item.num}>
                <ItemListInfo item={item} dateOptions={options} />
            </Link>
        );
    }
    render() {
        let list = this.getItemList()
        return (
            <section className="row my-5">
                <div className="col">
                    <div className="row justify-content-center align-items-stretch">
                        {list}
                    </div>
                </div>
            </section>
        );
    }
}

export default GameList;
