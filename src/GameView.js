import React from 'react';
import './GameView.css';
import CommentForm from './CommentForm';

class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { item: (props.items.filter( item => item.num === parseInt(props.itemNum) ))[0] };
        //this.loadItem = this.loadItem.bind(this)
        this.getComments = this.getComments.bind(this)
        this.getCommentsTitle = this.getCommentsTitle.bind(this)
        //console.log(this.props)
    }
    /*loadItem() {
        this.setState( (state,props) => ({ item: (props.items.filter( item => item.num === parseInt(props.itemNum) ))[0] }) );
        //console.log((this.props.items.filter( item => item.num === 1 ))[0])
        //console.log(this.state)
    }*/
    getComments() {
        //console.log(this.state)
        //<div className="separator"></div>
        //this.loadItem()
        let resultComments;
        if( this.state.item.comments.length > 0 ) {
            this.state.item.comments.sort((a,b) =>{
                if(a.date < b.date) {
                    return 1;
                } else {
                    return -1;
                }
            });
            //let i = 0;
            resultComments = this.state.item.comments.map( (comment) => {
                /*let separator = <div className="separator"></div>;
                if( i === 0 ) {
                    separator = null;
                }
                i++;
                <React.Fragment>
                    {separator}
                */
                return (
                    <div id={"comment-" + comment.num} key={comment.num} className="GameView-comment">
                            <p className="GameView-comment-author">De <span className="text-color-darkblue">{comment.author}</span> le <span className="text-color-darkblue">{comment.date.toLocaleDateString()}</span></p>
                            <p className="GameView-comment-text">{comment.text}</p>
                    </div>
                );
            });
        }
        return resultComments;
    }
    getCommentsTitle() {
        let title = 'Aucun commentaire';
        if( this.state.item.comments.length > 0 ) {
            title = 'Commentaire(s)';
        }
        return title;
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
                    <div className="GameView-comments-wrapper">
                        <div className="GameView-comments">
                            <h4 className="GameView-comments-title">{this.getCommentsTitle()}</h4>
                            {comments}
                        </div>
                        <div className="GameView-comments-form">
                            <h4 className="GameView-comments-form-title">Ajouter un commentaire</h4>
                            <CommentForm itemNum={this.props.itemNum} commentsLength={this.state.item.comments.length} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameView;
