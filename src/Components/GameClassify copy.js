import React from 'react';
import GameListInfo from './GameListInfo';
import {
    Link
  } from "react-router-dom";

function InListTitle(props) {
    return (<h4 className="col-12 m-1 text-center px-4 py-1 border">{props.children}</h4>);
}

const GameClassify = (props) => {

    const getNameOfClassifyField = (letter, datasArray, datasToExcude) => {
        let result;
        datasArray.sort( (a, b) => {
            if (a.name < b.name) {
               return -1;
            } else if (a.name > b.name) {
               return 1;
            }
            return 0;
        });
        let regex = RegExp('^'+letter,'i');
        datasArray.forEach( (data) => {
            let name = data.name;
            if( regex.test(name) === true ) {
                if( datasToExcude.includes(name) === false && result === null ) {
                    result = name;
                }
            }
        } );
        return result;
    }

    const checkSameClassifyField = (prevValue, datasArray) => {
        let result = false;
        datasArray.forEach( (data) => {
            let name = data.name;
            if( prevValue === name ) {
                result = true;
            }
        });
        return result;
    }

    const getGameList = () => {

        let datas = [];
        let classifyList = [];
        let countNum = 0;

        props.games.forEach( (game,index) => {
            let classifyFieldName = null;
            if( countNum === 0 ) {
                if( props.classifyBy === "studios" ) {
                    if( game.studios.length > 0 ) {
                        classifyFieldName = getNameOfClassifyField("a", game.studios, classifyList);
                    }
                } else if( props.classifyBy === "categories" ) {
                    if( game.categories.length > 0 ) {
                        classifyFieldName = getNameOfClassifyField("a", game.categories, classifyList);
                    }
                }
                if( classifyFieldName !== null ) {
                    classifyList.push(classifyFieldName);
                    countNum++;
                    datas.push(<InListTitle key={countNum} >{classifyFieldName}</InListTitle>);
                }
            } else if(classifyList.length > 0 && countNum > 0) {
                let lastClassifyListIndex = classifyList.length-1;
                let prevName = classifyList[lastClassifyListIndex];
                if( props.classifyBy === "studios" ) {
                    if( game.studios.length > 0 ) {
                        if( checkSameClassifyField( prevName, game.studios ) === false ) {
                            classifyFieldName = getNameOfClassifyField("a", game.studios, classifyList);
                        }
                    }
                } else if( props.classifyBy === "categories" ) {
                    if( game.categories.length > 0 ) {
                        if( checkSameClassifyField( prevName, game.categories ) === false ) {
                            classifyFieldName = getNameOfClassifyField("a", game.categories, classifyList);
                        }
                    }
                }
                if( classifyFieldName !== null ) {
                    classifyList.push(classifyFieldName);
                    countNum++;
                    datas.push(<InListTitle key={countNum} >{classifyFieldName}</InListTitle>);
                }
            }
            countNum++;
            datas.push(<Link to={"/GameApp/gameapp/public/view/" + game.id} key={countNum} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + game.id}>
                            <GameListInfo gameObject={game} />
                        </Link>);
        });

        return datas.map( (data) => data );
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
