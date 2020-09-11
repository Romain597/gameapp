import React from 'react';
import './GameView.css';
import CommentForm from './CommentForm';

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
                <div id={"comment-" + comment.num} key={comment.num} className="GameView-comment">
                        <p className="GameView-comment-author">De <span className="text-color-darkblue">{comment.author}</span> le <span className="text-color-darkblue">{comment.date.toLocaleDateString()}</span></p>
                        <p className="GameView-comment-text">{comment.text}</p>
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
        //let dateObj = new Date();
        //let dateString = dateObj.getUTCFullYear() + "-" + dateObj.getUTCMonth() + "-" + dateObj.getUTCDay();
        //let dateString = dateObj.toJSON();
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
            <div className="GameView">
                <div className="GameView-content">
                    <div className="GameView-item">
                        <p className="GameView-item-title">{this.state.item.title}</p>
                        <img className="GameView-item-poster" src={"/" + this.state.item.poster} alt={"Affiche de " + this.state.item.title} />
                        <p className="GameView-item-date">{"Date de sortie : " + this.state.item.releaseDate.toLocaleDateString('fr-FR', options)}</p>
                        <p className="GameView-item-date">{"Catégorie : " + this.state.item.category}</p>
                        <p className="GameView-item-from">{"Studio : " + this.state.item.from}</p>
                    </div>
                    <div className="GameView-comments-wrapper">
                        <div className="GameView-comments">
                            <h4 className="GameView-comments-title">{this.getCommentsTitle()}</h4>
                            {comments}
                        </div>
                        <div className="GameView-comments-form">
                            <h4 className="GameView-comments-form-title">Ajouter un commentaire</h4>
                            <CommentForm addComment={this.addComment} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameView;
