import React from 'react';
import GameListInfo from './GameListInfo';
import {
    Link
  } from "react-router-dom";

function InListTitle(props) {
    return (<h4 className="col-12 my-4 text-center px-4 py-2 border">{props.children}</h4>);
}

const GameClassify = (props) => {

    const getGameList = () => {

        let datasToRender = [];
        let countNum = 0;
        //console.log(props.datasList);

        if( props.datasList.length > 0 ) {
            props.datasList.forEach( (data) => {
                let games = data.games;
                //console.log(data);
                if( games.length > 0 ) {
                    countNum++;
                    datasToRender.push(<InListTitle key={countNum} >{data.name}</InListTitle>);
                    games.forEach( (game) => {
                        countNum++;
                        datasToRender.push(<Link to={"/GameApp/gameapp/public/view/" + game.id} key={countNum} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + game.id}>
                                            <GameListInfo gameObject={game} />
                                        </Link>);
                    });
                }
            });
        }

        return datasToRender.map( (dataToRender) => dataToRender );
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

export default GameClassify;
