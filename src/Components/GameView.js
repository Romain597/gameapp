import React , {  useState , useContext , useEffect } from 'react';
import GamesContext from './GamesContext'
import './css/GameView.css';
import Api from '../Api'
import CommentForm from './CommentForm';

function GameInfo(props) {
    let poster = "no-poster.svg";
    let dateString = "Non renseignée"
    let studiosNames = "Non renseigné"
    let categoriesNames = "Non renseignée"
    let name = "Inconnu"
    let description = "Empty"
    if( typeof props.gameObject === "array" ) {
        name = props.gameObject.name
        description = props.gameObject.description
        poster = props.gameObject.posterFile
        if( poster === null || poster.trim() === "" ) {
            poster = 'no-poster.svg';
        }
        //let dateString = "Non renseignée"
        if( props.gameObject.releasedAt !== null || props.gameObject.releasedAt.date !== "" ) {
            dateString = (props.getDateObjectMethod(props.gameObject.releasedAt.date)).toLocaleDateString('fr-FR', props.dateOptions)
        }
        let separator = ' | '
        let studios = props.gameObject.studios
        //let studiosNames = "Non renseigné"
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
        let categories = props.gameObject.categories
        //let categoriesNames = "Non renseignée"
        if( categories.length > 0 ) {
            categories.foreach( ( key, category ) => {
                if(category.name.trim() !== '' ) {
                    separator = ' | '
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
        <h4 className="col-12 text-center my-2 text-primary user-select-none">{name}</h4>
        <img className="col-6 text-center img-fluid my-2 p-0 border" src={"/" + poster} alt={"Affiche de " + name} />
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
    if( props.gameObject.publishedAt !== null || props.gameObject.publishedAt.date !== "" ) {
        dateString = (props.getDateObjectMethod(props.commentObject.publishedAt.date,displayTime)).toLocaleDateTimeString(props.commentDateOptions)
    }
    return (
        <div id={"comment-" + props.commentObject.id} key={props.commentObject.id} className="col-12 game-view-comment">
            <p className="user-select-none font-weight-light">De <span className="text-primary font-weight-normal">{props.commentObject.author}</span> le <span className="text-secondary font-weight-normal">{dateString}</span></p>
            <p className="user-select-none">{props.commentObject.text}</p>
        </div>
    );
}

const GameView = (props) => {
    /*constructor(props) {
        super(props)
        this.state = { items: this.props.items, item: (props.items.filter( item => item.num === parseInt(props.itemNum) ))[0] };
    }*/

    //const [ comments , setComments ] = useState(props.game.comments)
    const [ game , setGame ] = useState([])
    
    useEffect( () => {
        Api.getApiGameWithId(props.gameId, setGame);
    }, [game] );
    
    //const contextValue = useContext(GamesContext) //[ games , updateGames , sortingMethod ]

    const dateOptions = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }

    const getDateObject = (dateString , time = false ) => {
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

    const getComments = () => {
        let resultComments;
        let commentDateOptions = { ...dateOptions , hour: '2-digit', minute: '2-digit', second: '2-digit' }
        if( typeof game.comments === 'array' && game.comments.length > 0 ) {
            game.comments.sort((a,b) => {
                if(a.date < b.date) {
                    return 1;
                } else {
                    return -1;
                }
            });
            resultComments = game.comments.map( comment =>
                <Comment commentObject={comment} getDateObjectMethod={getDateObject} commentDateOptions={commentDateOptions} />
            );
        }
        return resultComments;
    }

    const getCommentsTitle = () => {
        let title = 'Aucun commentaire';
        if( typeof game.comments === 'array' && game.comments.length > 1 ) {
            title = 'Commentaires';
        } else if( typeof game.comments === 'array' && game.comments.length > 0 ) {
            title = 'Commentaire';
        }
        return title;
    }

    const addComment = (author,text) => {
        /*let num = parseInt(game.comments.length) + 1
        let currentDate = new Date()
        let dateString = currentDate.getUTCFullYear() + "-" + currentDate.getUTCMonth() + "-" + currentDate.getUTCDay();
        let newComment = { "id": num , "addDate": dateString , "author": author , "text": text }
        let commentsUpdated = game.comments;
        commentsUpdated.push(newComment)
        setComments(commentsUpdated)
        let gamesUpdated = contextValue.games
        gamesUpdated.foreach( (gameObject) => {
            if( gameObject.id === props.game.id ) {
                gameObject.comments = commentsUpdated
            }
        })
        contextValue.updateGames(gamesUpdated)*/
        /*let num = parseInt(this.state.item.comments.length) + 1
        let newComment = { "num": num , "date": new Date() , "author": author , "text": text }
        let items = this.state.items
        items.forEach((item) => ( parseInt(item.num) === parseInt(this.props.itemNum) ) ? item.comments.push(newComment) : false )
        let datas = JSON.stringify(items)
        localStorage.clear()
        localStorage.setItem("items",datas)
        this.setState({items: items})*/
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
