import React , {  useState , useEffect } from 'react';
import './css/GameView.css';
import Api from '../Api'
import CommentForm from './CommentForm';
import { useParams } from "react-router-dom";

function GameInfo(props) {

    let poster = "no-poster.svg";
    let dateString = "Non renseignée"
    let studiosNames = "Non renseigné"
    let categoriesNames = "Non renseignée"
    let name = "Inconnu"
    let description = "-"

    if( typeof props.gameObject === "object" ) {
        if( props.gameObject.name.trim() !== "" ) {
            name = props.gameObject.name
        }
        if( props.gameObject.description.trim() !== "" ) {
            description = props.gameObject.description
        }
        poster = props.gameObject.posterFile
        if( poster === null || poster.trim() === "" ) {
            poster = 'no-poster.svg';
        }
        if( props.gameObject.releasedAt !== null && props.gameObject.releasedAt !== "" ) {
            dateString = (props.getDateObjectMethod(props.gameObject.releasedAt)).toLocaleDateString('fr-FR', props.dateOptions)
        }
        let separator = ' | '
        let studios = props.gameObject.studios
        if( studios.length > 0 ) {
            studiosNames = "";
            studios.forEach( ( studio , index ) => {
                if(studio.name.trim() !== '' ) {
                    separator = <> <span key={index} className="text-secondary">|</span> </>
                    if( index  === 0 ) {
                        separator = ''
                    }
                    studiosNames = <>{studiosNames}{separator}{studio.name}</>
                }
            });
        }
        if( studiosNames.length === 0 ) {
            studiosNames = "Non renseigné"
        }
        let categories = props.gameObject.categories
        separator = ' | '
        if( categories.length > 0 ) {
            categoriesNames = "";
            categories.forEach( ( category , index ) => {
                if(category.name.trim() !== '' ) {
                    separator = <> <span key={index} className="text-secondary">|</span> </>
                    if( index === 0 ) {
                        separator = ''
                    }
                categoriesNames = <>{categoriesNames}{separator}{category.name}</>
                }
            });
        }
        if( categoriesNames.length === 0 ) {
            categoriesNames = "Non renseignée"
        }
    }

    return (
        <React.Fragment>
        <h4 className="col-12 text-center my-2 text-primary user-select-none">{name}</h4>
        <img className="col-6 text-center img-fluid my-2 p-0 border" src={"/img/" + poster} alt={"Affiche de " + name} />
        <p className="col-12 text-center my-2 user-select-none">Date de sortie : <span className="text-primary">{dateString}</span></p>
        <p className="col-12 text-center my-2 user-select-none">Catégorie : <span className="text-primary">{categoriesNames}</span></p>
        <p className="col-12 text-center my-2 user-select-none">Studio : <span className="text-primary">{studiosNames}</span></p>
        <p className="col-12 text-center my-2 user-select-none">Description : <span className="text-primary">{description}</span></p>
        </React.Fragment>
    );
}

function Comment(props) {

    let displayTime = true
    let dateString = '-'
    if( props.commentObject.publishedAt !== null && props.commentObject.publishedAt !== "" ) {
        dateString = (props.getDateObjectMethod(props.commentObject.publishedAt,displayTime)).toLocaleString(props.commentDateOptions)
    }

    return (
        <div id={"comment-" + props.commentObject.id} key={props.commentObject.id} className="col-12 game-view-comment">
            <p className="user-select-none font-weight-light">De <span className="text-primary font-weight-normal">{props.commentObject.author}</span> le <span className="text-secondary font-weight-normal">{dateString}</span></p>
            <p className="user-select-none">{props.commentObject.text}</p>
        </div>
    );
}

const GameView = (props) => {

    const { gameId } = useParams();

    const empty = {
        "id": 0,
        "name": "",
        "posterFile": "",
        "description": "",
        "releasedAt": "",
        "comments": [ ],
        "studios": [
            {
                "id": 0,
                "name": ""
            }
        ],
        "categories": [
            {
                "id": 0,
                "name": ""
            }
        ]
    }

    const [ game , setGame ] = useState(empty);

    useEffect( () => {
        Api.getApiGameWithId(gameId,setGame);
    }, [] );

    const dateOptions = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }

    const getDateObject = (dateString , time = false ) => {
        let dateObj = dateString;
        if( typeof dateString == "string" ) {
            if( time === false ) {
                dateString = dateString.replace(/[Tt].+$/gi,'');
                dateString = dateString.trim() + '-0-0-0'
            } else {
                dateString = dateString.replace(/[^\d-]/gi,'-');
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

    const getComments = () => {
        let resultComments;
        let commentDateOptions = { ...dateOptions , hour: '2-digit', minute: '2-digit', second: '2-digit' }
        if( typeof game.comments === 'object' && game.comments.length > 0 ) {
            game.comments.sort((a,b) => {
                if(a.date < b.date) {
                    return 1;
                } else {
                    return -1;
                }
            });
            resultComments = game.comments.map( (comment,index) =>
                <Comment key={index} commentObject={comment} getDateObjectMethod={getDateObject} commentDateOptions={commentDateOptions} />
            );
        }
        return resultComments;
    }

    const getCommentsTitle = () => {
        let title = 'Aucun commentaire';
        if( typeof game.comments === 'object' && game.comments.length > 1 ) {
            title = 'Commentaires';
        } else if( typeof game.comments === 'object' && game.comments.length > 0 ) {
            title = 'Commentaire';
        }
        return title;
    }

    const addComment = (author,text) => {
        let currentDate = new Date()
        let postDateString = currentDate.getUTCFullYear() + "_" + (currentDate.getUTCMonth() + 1) + "_" + currentDate.getUTCDate() + "_" + currentDate.getUTCHours() + "_" + currentDate.getUTCMinutes() + "_" + currentDate.getUTCSeconds();
        const commentPost = new URLSearchParams();
        commentPost.append('gameId', game.id);
        commentPost.append('author', author.trim());
        commentPost.append('publishedDate', postDateString.trim());
        commentPost.append('comment', text.trim());
        Api.setApiNewComment( commentPost );
        let num = parseInt(game.comments.length) + 1
        let newComment = {
                            "id": num,
                            "author": author,
                            "publishedAt": currentDate.toJSON(),
                            "text": text
                        }
        let gameUpdated = game;
        gameUpdated.comments.push(newComment)
        setGame(gameUpdated)
        Api.getApiGameWithId(gameId,setGame);
    }

    return (
        <article className="row my-5">
            <div className="col">
                <h4 className="text-center user-select-none">Détails du jeux</h4>
                <div className="row mb-3 justify-content-center">
                    <GameInfo gameObject={game} getDateObjectMethod={getDateObject} dateOptions={dateOptions} />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <h5 className="mb-3 mx-n3 p-2 p-2 border rounded border-secondary user-select-none text-center">{getCommentsTitle()}</h5>
                        <div className="row justify-content-center list-group">
                            {getComments()}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <h5 className="mb-3 mx-n3 p-2 p-2 border rounded border-secondary user-select-none text-center">Ajouter un commentaire</h5>
                        <div className="row justify-content-center">
                            <CommentForm addCommentMethod={addComment} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default GameView;
