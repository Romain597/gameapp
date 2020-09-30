import React from 'react';
import GameListInfo from './GameListInfo';
import {
    Link
  } from "react-router-dom";

function InListTitle(props) {
    return (<h4 className="col-12 my-4 text-center px-4 py-2 border rounded user-select-none">{props.children}</h4>);
}

const GameClassify = (props) => {

    const getGameList = () => {

        let datasToRender = [];
        let countNum = 0;

        if( props.datasList.length > 0 ) {
            props.datasList.forEach( (data) => {
                if( props.classifyBy === "games" ) {
                    countNum++;
                    datasToRender.push(<Link to={"/GameApp/gameapp/public/view/" + data.id} key={countNum} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + data.id}>
                                        <GameListInfo gameObject={data} fieldToExclude={props.classifyBy} />
                                    </Link>);
                } else {
                    let games = data.games;
                    if( games.length > 0 ) {
                        countNum++;
                        datasToRender.push(<InListTitle key={countNum} >{data.name}</InListTitle>);
                        games.forEach( (game) => {
                            countNum++;
                            datasToRender.push(<Link to={"/GameApp/gameapp/public/view/" + game.id} key={countNum} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + game.id}>
                                                <GameListInfo gameObject={game} fieldToExclude={props.classifyBy} />
                                            </Link>);
                        });
                    }
                }
            });
        }

        return datasToRender.map( (dataToRender) => dataToRender );
    }

    return (
        <section className="row mb-5 mt-4">
            <div className="col">
                <div className="row justify-content-center align-items-stretch">
                    {getGameList()}
                </div>
            </div>
        </section>
    );
}

export default GameClassify;
