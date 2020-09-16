import React from 'react';
import './css/GameView.css';
import CommentForm from './CommentForm';

function GameInfo(props) {
    return (
        <React.Fragment>
        <h4 className="col-12 text-center my-2 text-primary user-select-none">{props.item.title}</h4>
        <img className="col-6 text-center img-fluid my-2" src={"/" + props.item.poster} alt={"Affiche de " + props.item.title} />
        <p className="col-12 text-center my-2 user-select-none">Date de sortie : <span className="text-primary">{props.item.releaseDate.toLocaleDateString('fr-FR', props.dateOptions)}</span></p>
        <p className="col-12 text-center my-2 user-select-none">Catégorie : <span className="text-primary">{props.item.category}</span></p>
        <p className="col-12 text-center my-2 user-select-none">Studio : <span className="text-primary">{props.item.from}</span></p>
        </React.Fragment>
    );
}

class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { items: this.props.items, item: (props.items.filter( item => item.num === parseInt(props.itemNum) ))[0] };
        this.getComments = this.getComments.bind(this)
        this.getCommentsTitle = this.getCommentsTitle.bind(this)
        this.addComment = this.addComment.bind(this)
    }
    getComments() {
        let resultComments;
        if( this.state.item.comments.length > 0 ) {
            this.state.item.comments.sort((a,b) =>{
                if(a.date < b.date) {
                    return 1;
                } else {
                    return -1;
                }
            });
            resultComments = this.state.item.comments.map( comment =>
                <div id={"comment-" + comment.num} key={comment.num} className="col-12 game-view-comment">
                        <p className="user-select-none font-weight-light">De <span className="text-primary font-weight-normal">{comment.author}</span> le <span className="text-secondary font-weight-normal">{comment.date.toLocaleDateString()}</span></p>
                        <p className="user-select-none">{comment.text}</p>
                </div>
            );
        }
        return resultComments;
    }
    getCommentsTitle() {
        let title = 'Aucun commentaire';
        if( this.state.item.comments.length > 1 ) {
            title = 'Commentaires';
        } else if( this.state.item.comments.length > 0 ) {
            title = 'Commentaire';
        }
        return title;
    }
    addComment(author,text) {
        let num = parseInt(this.state.item.comments.length) + 1
        let newComment = { "num": num , "date": new Date() , "author": author , "text": text }
        let items = this.state.items
        items.forEach((item) => ( parseInt(item.num) === parseInt(this.props.itemNum) ) ? item.comments.push(newComment) : false )
        let datas = JSON.stringify(items)
        localStorage.clear()
        localStorage.setItem("items",datas)
        this.setState({items: items})
    }
    render() {
        let comments = this.getComments()
        const options = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };
        return (
            <article className="row my-5">
                <div className="col">
                    <h4 className="text-center user-select-none">Détails du jeux</h4>
                    <div className="row mb-3 justify-content-center">
                        <GameInfo item={this.state.item} dateOptions={options} />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <h5 className="mb-3 mx-n3 p-2 p-2 border rounded border-secondary user-select-none text-center">{this.getCommentsTitle()}</h5>
                            <div className="row justify-content-center list-group">
                                {comments}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <h5 className="mb-3 mx-n3 p-2 p-2 border rounded border-secondary user-select-none text-center">Ajouter un commentaire</h5>
                            <div className="row justify-content-center">
                                <CommentForm addComment={this.addComment} />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default GameView;
