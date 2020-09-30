import React from 'react';
import GameListInfo from './GameListInfo';
import {
    Link
  } from "react-router-dom";

const GameList = (props) => {

    const getGameList = () => {
        return props.games.map( (game) => (
            <Link to={"/GameApp/gameapp/public/view/" + game.id} key={game.id} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + game.id}>
                <GameListInfo gameObject={game} />
            </Link>)
        );
    }

    const getClassifyTitle = () => {
        //console.log(props.sortingOptions);
        if( props.sortingOptions.hasOwnProperty('classifyId') === true && props.sortingOptions.hasOwnProperty('classifyField') === true ) {
            let title = 'Classer par un studio ou une catégorie';
            if( props.sortingOptions.classifyField === "studio" ) {
                title = 'Classer par un studio';

            } else if( props.sortingOptions.classifyField === "category" ) {
                title = 'Classer par une catégorie';

            }
            return (<h3>{title}</h3>);
        }
        return null;
    }

    return (
        <>
        {getClassifyTitle()}
        <section className="row my-5">
            <div className="col">
                <div className="row justify-content-center align-items-stretch">
                    {getGameList()}
                </div>
            </div>
        </section>
        </>
    );
}

export default GameList;
