import React , {  useState , useContext , useEffect } from 'react';
import GamesContext from './GamesContext'
import './css/GameView.css';
import axios from 'axios';
import Api from '../Api'
import CommentForm from './CommentForm';

function GameInfo(props) {
    //console.log(props.gameObject);
    let poster = "no-poster.svg";
    let dateString = "Non renseignée"
    let studiosNames = "Non renseigné"
    let categoriesNames = "Non renseignée"
    let name = "Inconnu"
    let description = "-"
    if( typeof props.gameObject === "object" ) { // && props.gameObject.length > 0
        if( props.gameObject.name.trim() != "" ) {
            name = props.gameObject.name
        }
        if( props.gameObject.description.trim() != "" ) {
            description = props.gameObject.description
        }
        poster = props.gameObject.posterFile
        if( poster === null || poster.trim() == "" ) {
            poster = 'no-poster.svg';
        }
        //let dateString = "Non renseignée"
        if( props.gameObject.releasedAt !== null && props.gameObject.releasedAt !== "" ) {
            dateString = (props.getDateObjectMethod(props.gameObject.releasedAt)).toLocaleDateString('fr-FR', props.dateOptions)
        }
        let separator = ' | '
        let studios = props.gameObject.studios
        //let studiosNames = "Non renseigné"
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
        if( studiosNames.length == 0 ) {
            studiosNames = "Non renseigné"
        }
        let categories = props.gameObject.categories
        separator = ' | '
        //let categoriesNames = "Non renseignée"
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
        if( categoriesNames.length == 0 ) {
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
    //console.log(props.commentObject)
    let displayTime = true
    let dateString = '-'
    //console.log(props.getDateObjectMethod(props.commentObject.publishedAt,displayTime))
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
    /*constructor(props) {
        super(props)
        this.state = { items: this.props.items, item: (props.items.filter( item => item.num === parseInt(props.itemNum) ))[0] };
    }*/

    //const contextValue = useContext(GamesContext)

    //const [ comments , setComments ] = useState(props.game.comments)
    
    //const [ game , setGame ] = useState(contextValue.games[0])
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
    
    //Api.getApiGameWithId(props.gameId,setGame);
    //Api.getGame(props.gameId,setGame);
    /*axios.get('https://localhost:8000/game/'+props.gameId)
      .then(response => {
        //console.log(response);
        setGame( response.data );
        console.log(game);
      });*/

      /*async function fetchData() {
        const res = await fetch('https://localhost:8000/game/'+props.gameId);
        res
          .json()
          .then(res => console.log(res))
          .catch(err => console.log(err));
          await axios.get('https://localhost:8000/game/'+props.gameId)
          .then(response => {
            console.log(response.data);
            setGame( response.data );
          });
      }
      fetchData();*/

      /*let ignore = false;    
      async function fetchData() {
        const response = await fetch('https://localhost:8000/game/'+props.gameId);
        const json = await response.json();
        if (!ignore) setGame(json);    
      }
      fetchData();
      //return () => { ignore = true };*/

    /*useEffect(() => {
        props.fetchGame(setGame);
    }, [props.fetchGame]);*/

    useEffect( () => {
        Api.getApiGameWithId(props.gameId,setGame);
        //Api.getGame(props.gameId,setGame);
        /*axios.get('https://localhost:8000/game/1')
      .then(response => {
        const datas = response.data;
        console.log(response);
        setGame( datas );
      });
      let ignoreb = false;    
      async function fetchDatab() {
        const responseb = await fetch('https://localhost:8000/game/'+props.gameId);
        const jsonb = await responseb.json();
        if (!ignoreb) setGame(jsonb);    
      }
      fetchDatab();
      return () => { ignoreb = true };*/
    }, [game] );

    //console.log(game);

    //const contextValue = useContext(GamesContext) //[ games , updateGames , sortingMethod ]

    /*const [ comments , setComments ] = useState(game.comments);
    
    useEffect( () => {
        setComments(game.comments);
    }, [game.comments] );*/

    const dateOptions = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }

    const getDateObject = (dateString , time = false ) => {
        let dateObj = dateString;
        //console.log(time)
        //console.log(typeof dateString)
        if( typeof dateString == "string" ) {
            if( time === false ) {
                dateString = dateString.replace(/[Tt].+$/gi,'');
                dateString = dateString.trim() + '-0-0-0'
            } else {
                dateString = dateString.replace(/[^\d\-]/gi,'-');
            }
            //console.log(dateString)
            let dateArray = dateString.split('-');
            let year = parseInt(dateArray[0] , 10);
            let month = parseInt(dateArray[1] , 10) - 1;
            let day = parseInt(dateArray[2] , 10);
            let hour = parseInt(dateArray[3] , 10);
            let minute = parseInt(dateArray[4] , 10);
            let second = parseInt(dateArray[5] , 10);
            //console.log(dateArray.map((date)=>parseInt(date)));
            //console.log(new Date(Date.UTC(year,month,day,hour,minute,second)))
            dateObj = new Date(Date.UTC(year,month,day,hour,minute,second));
        }
        return dateObj;
    }

    const getDaysInMonth = ( year , month ) => {
        // Here January is 0 based
        return new Date( year , month + 1 , 0 ).getDate();
    }

    const getComments = () => {
        //console.log(game.comments);
        //console.log(comments);
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

    /*const getCommentPostId  = (postResponse) => {
        let commentPostId = null;
        if( typeof postResponse === 'string' ) {
            commentPostId = parseInt(postResponse.replace(/^[^\<\>]*\<\s*(\d+)\s*\>[^\<\>]*$/gi,"$1"),10);
        }
        return commentPostId;
    }*/

    const addComment = (author,text) => {
        let currentDate = new Date()
        let postDateString = currentDate.getUTCFullYear() + "_" + currentDate.getUTCMonth() + "_" + currentDate.getUTCDay() + "_" + currentDate.getUTCHours() + "_" + currentDate.getUTCMinutes() + "_" + currentDate.getUTCSeconds();
        const commentPost = new URLSearchParams();
        commentPost.append('gameId', game.id);
        commentPost.append('author', author.trim());
        commentPost.append('publishedDate', postDateString.trim());
        commentPost.append('comment', text.trim());
        //let commentPost = { 'gameId': game.id, 'author': author, 'publishedDate': postDateString, 'comment': text }
        //console.log(getCommentPostId('Success : Saved new comment with the identification number <24>.'));
        Api.setApiNewComment( commentPost );
        /*//
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([commentPost])
        };
        fetch('https://localhost:8000/game/comment', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        //*/ 
        /*if( commentPostId === null ) {
            commentPostId = parseInt(comments.length) + 1
        }*/
        let num = parseInt(game.comments.length) + 1
        let newComment = {
                            "id": num,
                            "author": author,
                            "publishedAt": currentDate.toJSON(),
                            "text": text
                        }
        /*let commentsUpdated = comments;
        commentsUpdated.push(newComment)
        setComments(commentsUpdated)*/
        let gamesUpdated = game;
        gamesUpdated.comments.push(newComment)
        setGame(gamesUpdated)
        //console.log(comments)
        /*let commentsUpdated = game.comments;
        commentsUpdated.push(newComment)
        setComments(commentsUpdated)
        let gamesUpdated = contextValue.games
        gamesUpdated.forEach( (gameObject) => {
            if( gameObject.id === props.game.id ) {
                gameObject.comments = commentsUpdated
            }
        })
        contextValue.updateGames(gamesUpdated)*/
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
