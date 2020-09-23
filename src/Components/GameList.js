import React , { useState , useContext , useEffect } from 'react';
import GamesContext from './GamesContext'
import Api from '../Api'
import axios from 'axios';
import {
    Link
  } from "react-router-dom";

function GameListInfo(props) {
    //console.log(props.gameObject);
    let poster = "no-poster.svg";
    let dateString = "Non renseignée"
    let categoriesNames = "Non renseignée"
    let name = "Inconnu"
    if( typeof props.gameObject === "object" ) { // && props.gameObject.length > 0
        name = props.gameObject.name
        poster = props.gameObject.posterFile
        if( poster === null || poster.trim() === "" ) {
            poster = 'no-poster.svg';
        }
        //let dateString = '-'
        if( props.gameObject.releasedAt !== null && props.gameObject.releasedAt !== "" ) {
            dateString = (props.getDateObjectMethod(props.gameObject.releasedAt)).toLocaleDateString('fr-FR', props.dateOptions)
        }
        let separator = ' | '
        let categories = props.gameObject.categories
        //let categoriesNames = "Non renseignée"
        if( categories.length > 0 ) {
            categoriesNames = "";
            categories.forEach( ( category , key ) => {
                if(category.name.trim() !== '' ) {
                    separator = ', '
                    if( key === 0 ) {
                        separator = ''
                    }
                    categoriesNames += separator + category.name
                }
            });
        }
    }
    return (
        <React.Fragment>
        <h6 className="text-center font-weight-bold my-2">{name}</h6>
        <img className="text-center w-100 mt-1 img-fluid" src={"/img/" + poster} alt={"Affiche de " + name} />
        <p className="text-center my-2">Date de sortie : {dateString}</p>
        <p className="text-center my-2">Catégorie(s) : {categoriesNames}</p>
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
    //console.log(contextValue);
    /*const [ games , setGames ] = useState([]);

    useEffect( () => {
        Api.getApiGames(setGames);
    }, [games] );*/

    /*axios.get('https://localhost:8000/games')
          .then(response => {
            const datas = response.data;
            console.log( datas );
          });*/

    const dateOptions = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };

    const getGameDateObject =  (dateString , time = false ) => {
        let dateObj = dateString;
        if( typeof dateString == "string" ) {
            if( time === false ) {
                dateString = dateString.replace(/[Tt].+$/,'');
                dateString = dateString.trim() + '-0-0-0'
            } else {
                dateString = dateString.replace(/[^\d\-]/,'-');
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
        //console.log(contextValue.games)
        return contextValue.games.map( (game) => (
            <Link to={"/GameApp/gameapp/public/view/" + game.id} key={game.id} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + game.id}>
                <GameListInfo gameObject={game} getDateObjectMethod={getGameDateObject} dateOptions={dateOptions} />
            </Link>)
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
