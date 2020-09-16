import React , { useState , useContext } from 'react';
import GamesContext from './GamesContext'
import './css/GameView.css';
import CommentForm from './CommentForm';

function GameInfo(props) {
    return (
        <React.Fragment>
        <h4 className="col-12 text-center my-2 text-primary user-select-none">{props.gameObject.title}</h4>
        <img className="col-6 text-center img-fluid my-2" src={"/" + props.gameObject.poster} alt={"Affiche de " + props.gameObject.title} />
        <p className="col-12 text-center my-2 user-select-none">Date de sortie : <span className="text-primary">{(props.getDateObjectMethod(props.gameObject.releaseDate)).toLocaleDateString('fr-FR', props.dateOptions)}</span></p>
        <p className="col-12 text-center my-2 user-select-none">Catégorie : <span className="text-primary">{props.gameObject.category}</span></p>
        <p className="col-12 text-center my-2 user-select-none">Studio : <span className="text-primary">{props.gameObject.studio}</span></p>
        </React.Fragment>
    );
}

function Comment(props) {
    return (
        <div id={"comment-" + props.commentObject.id} key={props.commentObject.id} className="col-12 game-view-comment">
            <p className="user-select-none font-weight-light">De <span className="text-primary font-weight-normal">{props.commentObject.author}</span> le <span className="text-secondary font-weight-normal">{(props.getDateObjectMethod(props.commentObject.addDate)).toLocaleDateString(props.dateOptions)}</span></p>
            <p className="user-select-none">{props.commentObject.text}</p>
        </div>
    );
}

const GameView = (props) => {
    /*constructor(props) {
        super(props)
        this.state = { items: this.props.items, item: (props.items.filter( item => item.num === parseInt(props.itemNum) ))[0] };
    }*/

    const [ comments , setComments ] = useState(props.game.comments)

    const contextValue = useContext(GamesContext) //[ games , updateGames , sortingMethod ]

    const dateOptions = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }

    const getDateObject = (dateString) => {
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

    const getComments = () => {
        let resultComments;
        if( comments.length > 0 ) {
            comments.sort((a,b) => {
                if(a.date < b.date) {
                    return 1;
                } else {
                    return -1;
                }
            });
            resultComments = comments.map( comment =>
                <Comment commentObject={comment} getDateObjectMethod={getDateObject} dateOptions={dateOptions} />
            );
        }
        return resultComments;
    }

    const getCommentsTitle = () => {
        let title = 'Aucun commentaire';
        if( comments.length > 1 ) {
            title = 'Commentaires';
        } else if( comments.length > 0 ) {
            title = 'Commentaire';
        }
        return title;
    }

    const addComment = (author,text) => {
        let num = parseInt(comments.length) + 1
        let currentDate = new Date()
        let dateString = currentDate.getUTCFullYear() + "-" + currentDate.getUTCMonth() + "-" + currentDate.getUTCDay();
        let newComment = { "id": num , "addDate": dateString , "author": author , "text": text }
        let commentsUpdated = comments;
        commentsUpdated.push(newComment)
        setComments(commentsUpdated)
        let gamesUpdated = contextValue.games
        gamesUpdated.foreach( (gameObject) => {
            if( gameObject.id === props.game.id ) {
                gameObject.comments = commentsUpdated
            }
        })
        contextValue.updateGames(gamesUpdated)
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
                    <GameInfo gameObject={props.game} getDateObjectMethod={getDateObject} dateOptions={dateOptions} />
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
