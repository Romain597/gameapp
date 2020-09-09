import React from 'react';
import './GameList.css';

class GameList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { sortType: this.props.sortType , items: this.props.itemsSorted };
    }
    render() {
        //console.log(this.state.items);
        let list = this.state.items.map( item =>
            <div className="GameList-col">
                <a href="#" className="GameList-item" key={"item-" + item.num}>
                    <p className="GameList-item-title">{item.title}</p>
                    <img className="GameList-item-poster" src={"/" + item.poster} alt={"Affiche de " + item.title} />
                    <p className="GameList-item-date">{"Date de sortie : " + item.releaseDate.toLocaleDateString()}</p>
                    <p className="GameList-item-from">{"Studio : " + item.from}</p>
                </a>
            </div>
        );
        return (
            <div className="GameList">
                <div className="GameList-content">
                    <div className="GameList-row">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameList;
