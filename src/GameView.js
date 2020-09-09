import React from 'react';
import './GameView.css';
import CommentForm from './CommentForm';

class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { itemNum: this.props.itemNum , items: this.props.items };
    }
    render() {
        let item = this.state.items.filter( item => item.num === this.state.itemNum );
        let comments = <p>Aucun commentaire</p>;
        if( item.comments.length > 0 ) {
            item.comments.sort((a,b) =>{
                if(a.date > b.date) {
                    return 1;
                } else {
                    return -1;
                }
            });
            comments = item.comments.map( (comment , key) =>
                <div key={"comment-" + key} className="GameView-comment">
                        <p className="GameView-comment-author">{"De " + <span className="text-bold">comment.author</span> + " le " + comment.date.toLocaleDateString()}</p>
                        <p className="GameView-comment-text">{comment.text}</p>
                </div>
            );
        }
        return (
            <div className="GameView">
                <div className="GameView-content">
                    <div className="GameView-item">
                        <p className="GameView-item-title">{item.title}</p>
                        <img className="GameView-item-poster" src={"/" + item.poster} alt={"Affiche de " + item.title} />
                        <p className="GameView-item-date">{"Date de sortie : " + item.releaseDate.toLocaleDateString()}</p>
                        <p className="GameView-item-from">{"Studio : " + item.from}</p>
                    </div>
                    <hr />
                    <div className="GameView-comments-wrapper">
                        <div className="GameView-comments">
                            {comments}
                        </div>
                        <hr />
                        <div className="GameView-comments-form">
                            <CommentForm commentsLength={item.comments.length} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameView;
