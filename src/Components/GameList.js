import React , { useContext } from 'react';
import GamesContext from './GamesContext'
import {
    Link
  } from "react-router-dom";

function GameListInfo(props) {
    let poster = props.gameObject.posterFile
    if( poster === null || poster.trim() === "" ) {
        poster = 'poster-no-image.png';
    }
    let dateString = '-'
    if( props.gameObject.releasedAt !== null || props.gameObject.releasedAt.date !== "" ) {
        dateString = (props.getDateObjectMethod(props.gameObject.releasedAt.date)).toLocaleDateString('fr-FR', props.dateOptions)
    }
    let studios = props.gameObject.studios
    let studiosNames = '-' //"Non renseigné"
    let separator = ' | '
    if( studios.length > 0 ) {
        studios.foreach( ( key, studio ) => {
            if(studio.name.trim() !== '' ) {
                separator = ' | '
                if( key === 0 ) {
                    separator = ''
                }
                studiosNames += separator + studio.name
            }
        });
    }
    return (
        <React.Fragment>
        <h6 className="text-center font-weight-bold my-2">{props.gameObject.name}</h6>
        <img className="text-center w-100 mt-1 img-fluid" src={"/" + poster} alt={"Affiche de " + props.gameObject.name} />
        <p className="text-center my-2">Date de sortie : {dateString}</p>
        <p className="text-center my-2">Studio : {studiosNames}</p>
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

    const getGameDateObject =  (dateString , time = false ) => {
        let dateObj = dateString;
        if( typeof dateString == "string" ) {
            if( time === false ) {
                dateString = dateString.replace(/[Tt].+$/,'');
                dateString = dateString.trim() + '-0-0-0'
            } else {
                dateString = dateString.replace(/[^\s\d:]/,'');
                dateString = dateString.trim().replace(/[:\s]/,'-');
            }
            let dateArray = dateString.split('-');
            let year = parseInt(dateArray[0] , 10);
            let month = parseInt(dateArray[1] , 10) - 1;
            let day = parseInt(dateArray[2] , 10);
            let hour = parseInt(dateArray[3] , 10);
            let minute = parseInt(dateArray[4] , 10);
            let second = parseInt(dateArray[5] , 10);
            dateObj = new Date(Date.UTC(year,month,day,hour,minute,second));
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
