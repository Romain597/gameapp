import React , { useContext } from 'react';
import GameListInfo from './GameListInfo';
import SortingContext from './SortingContext';
import {
    Link
  } from "react-router-dom";

const GameList = (props) => {

    let contextValue = useContext(SortingContext);

    const getGameList = () => {
        return props.games.map( (game) => (
            <Link to={"/GameApp/gameapp/public/view/" + game.id} key={game.id} className="col-5 m-1 align-self-stretch px-4 py-1 border list-group-item list-group-item-action" id={"game-" + game.id}>
                <GameListInfo gameObject={game} />
            </Link>)
        );
    }

    const getClassifyTitle = () => {
        if( contextValue.sortingOptions.hasOwnProperty('classifyField') === true ) {
            let title = 'Studio ou catégorie';
            if( contextValue.sortingOptions.classifyField === "studio" ) {
                title = 'Studio :';
                if( contextValue.sortingOptions.hasOwnProperty('classifyId') === true && props.games.length > 0 ) {
                    let find = false;
                    props.games.forEach((game) => {
                        if( game.studios.length > 0 && find === false ) {
                            game.studios.forEach((studio) => {
                                if( studio.id === parseInt(contextValue.sortingOptions.classifyId, 10) && find === false ) {
                                    title += ' ' + studio.name;
                                    find = true;
                                    return true;
                                }
                            });
                        } else if( find === true ) {
                            //break;
                            return true;
                        }
                    });
                }
            } else if( contextValue.sortingOptions.classifyField === "category" ) {
                title = 'Catégorie :';
                if( contextValue.sortingOptions.hasOwnProperty('classifyId') === true && props.games.length > 0 ) {
                    let find = false;
                    props.games.forEach((game) => {
                        if( game.categories.length > 0 && find === false ) {
                            game.categories.forEach((category) => {
                                if( category.id === parseInt(contextValue.sortingOptions.classifyId, 10) && find === false ) {
                                    title += ' ' + category.name;
                                    find = true;
                                    return true;
                                }
                            });
                        } else if( find === true ) {
                            //break;
                            return true;
                        }
                    });
                }
            }
            return (<h4 className="col-12 mb-3 mt-1 text-center px-4 py-2 text-center user-select-none">{title}</h4>);
        }
        return null;
    }

    return (
        <section className="row my-5">
            <>
            {getClassifyTitle()}
            <div className="col-12">
                <div className="row justify-content-center align-items-stretch">
                    {getGameList()}
                </div>
            </div>
            </>
        </section>
    );
}

export default GameList;
