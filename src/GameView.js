import React from 'react';
import './GameView.css';
import CommentForm from './CommentForm';

class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { item: null };
        this.loadItem = this.loadItem.bind(this)
        this.getComments = this.getComments.bind(this)
        console.log(this.props)
    }
    loadItem() {
        this.setState( (state,props) => ({ item: (props.items.filter( item => item.num === parseInt(props.itemNum) ))[0] }) );
        //this.setState( { item: (this.props.items.filter( item => item.num === 1 ))[0] } );
        //console.log((this.props.items.filter( item => item.num === 1 ))[0])
        //console.log(this.state)
    }
    getComments() {
        //console.log(this.state)
        this.loadItem()
        let resultComments = <p>Aucun commentaire</p>;
        if( this.state.item.comments.length > 0 ) {
            this.state.item.comments.sort((a,b) =>{
                if(a.date > b.date) {
                    return 1;
                } else {
                    return -1;
                }
            });
            resultComments = this.state.item.comments.map( comment =>
                <div id={"comment-" + comment.id} key={comment.id} className="GameView-comment">
                        <p className="GameView-comment-author">{"De " + <span className="text-bold">comment.author</span> + " le " + comment.date.toLocaleDateString()}</p>
                        <p className="GameView-comment-text">{comment.text}</p>
                </div>
            );
        }
        return resultComments;
    }
    render() {
        let comments = this.getComments()
        return (
            <div className="GameView">
                <div className="GameView-content">
                    <div className="GameView-item">
                        <p className="GameView-item-title">{this.state.item.title}</p>
                        <img className="GameView-item-poster" src={"/" + this.state.item.poster} alt={"Affiche de " + this.state.item.title} />
                        <p className="GameView-item-date">{"Date de sortie : " + this.state.item.releaseDate.toLocaleDateString()}</p>
                        <p className="GameView-item-date">{"Catégorie : " + this.state.item.category}</p>
                        <p className="GameView-item-from">{"Studio : " + this.state.item.from}</p>
                    </div>
                    <hr />
                    <div className="GameView-comments-wrapper">
                        <div className="GameView-comments">
                            {comments}
                        </div>
                        <hr />
                        <div className="GameView-comments-form">
                            <CommentForm commentsLength={this.state.item.comments.length} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameView;
