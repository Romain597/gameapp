import React , { useContext } from 'react';
import GamesContext from './GamesContext'
import {
    Link
  } from "react-router-dom";

function GameListInfo(props) {
    return (
        <React.Fragment>
        <h6 className="text-center font-weight-bold my-2">{props.gameObject.title}</h6>
        <img className="text-center w-100 mt-1 img-fluid" src={"/" + props.gameObject.poster} alt={"Affiche de " + props.gameObject.title} />
        <p className="text-center my-2">{"Date de sortie : " + (props.getDateObjectMethod(props.gameObject.releaseDate)).toLocaleDateString('fr-FR', props.dateOptions)}</p>
        <p className="text-center my-2">{"Studio : " + props.gameObject.studio}</p>
        </React.Fragment>
    );
}

const GameList = () => {
    /*constructor(props) {
        super(props)
        if(!localStorage.getItem('items')) {
            localStorage.setItem("items",JSON.stringify(this.props.items));
        }
        let itemsStored = JSON.parse(localStorage.getItem('items'));
        this.state = { items: itemsStored }
        this.getItemList = this.getItemList.bind(this)
    }*/

    const contextValue = useContext(GamesContext)

    const dateOptions = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };

    const getGameDateObject = (dateString) => {
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

    const getGameList = () => {
        return contextValue.games.map( game =>
            <Link to={"/GameApp/gameapp/public/view/" + game.id} key={game.id} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + game.id}>
                <GameListInfo gameObject={game} getDateObjectMethod={getGameDateObject} dateOptions={dateOptions} />
            </Link>
        );
    }

    return (
        <section className="row my-5">
            <div className="col">
                <div className="row justify-content-center align-items-stretch">
                    {getGameList()}
                </div>
            </div>
        </section>
    );
}

export default GameList;
